import express from "express";
import { joinPath } from "./utils/paths";
import { isDevelopment, isProduction } from "./config/env";
import { ChunkExtractor } from "@loadable/server";
import serveFavicon from "serve-favicon";
import App from "./components/App";
import { port } from "./config/url";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { getHtmlString } from "./utils/htmlString";
import React from "react";
import { configureStore } from "./utils/configureStore";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import routes from "./routes";

const app = express();

const getExtractor = () => {
    const statsFile = joinPath(isProduction ? "dist" : "", "public/assets/loadable-stats.json");
    const extractor = new ChunkExtractor({ statsFile });
    return extractor;
};

const loadComponents = (branch) => {
    return Promise.all(
        branch.map(({route}) => {
            if (route.component.load) {                                
                return route.component.load();
            }
            return Promise.resolve();
        })
    );
};

const getBranchWithLoadedComponent = (branch, loadedComponents) => {
    return loadedComponents.map((component, index) => ({
        ...branch[index],
        route: {
            ...branch[index].route,
            ...(component && {
                component: component.default,
            }),
        },
    }));
};

const getLoadedBranchData = (branch, store, query) => {
    return branch.filter(({route}) => route.component.loadData)
    .map(({ route, match }) => 
        route.component.loadData({
            dispatch: store.dispatch,
            state: store.getState(),
            params: match.params,
            query,
            route
        })
    );
};

if(isDevelopment) {
    const webpack = require("webpack");
    const getWebpackClientConfig = require("../tools/webpack/webpack.client.babel");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackClientConfig = getWebpackClientConfig({});
    const compiler = webpack(webpackClientConfig);

    app.use(webpackDevMiddleware(compiler, {
        // logLevel: "silent",
        stats: "minimal",        
        publicPath: webpackClientConfig.output.publicPath,
        hot: true,
        serverSideRender: true,
        writeToDisk(filePath) {
            return /loadable-stats/.test(filePath) || /manifest/.test(filePath);
        }
    }));    
    app.use(webpackHotMiddleware(compiler));
};

app.use(express.static(joinPath(isProduction ? "dist" : "", "public")));

app.use(serveFavicon(joinPath(isProduction ? "dist" : "", "public/favicon.ico")));

app.get("*", async (req, res) => {
    //NOTE: 앱 안에 route를 넣어놓으면 리로드시 url 강제 이동됨.
    //서버 안에서 주소에 맞는 모듈을 찾아서 넣어주기
    const store = configureStore();
    const branch = matchRoutes(routes, req.path);        
    
    const loadedComponents = await loadComponents(branch);    

    const branchWithLoadedComponents = getBranchWithLoadedComponent(
        branch,
        loadedComponents
    );        

    const loadedBranchData = getLoadedBranchData(
        branchWithLoadedComponents,
        store,
        req.query
    );    

    Promise.all(loadedBranchData).then(async () => {
        const extractor = getExtractor();
        const context = {};            
        
        const app = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}> 
                    <App/>
                </StaticRouter>        
            </Provider>            
        );

        const jsx = extractor.collectChunks(app);
        const content = renderToString(jsx);        
        const scriptTags = extractor.getScriptTags();
        const styleTags = extractor.getStyleTags();
        const linkTags = extractor.getLinkTags();                   
        const htmlString = getHtmlString(linkTags, styleTags, content, scriptTags);    
        console.log(htmlString);
        res.send(htmlString);
    }).catch(err => {
        console.log(`😱 Rendering Error: ${err}`);
    });     
});

const server = app.listen(port, () => {
    console.log(`😎 server is running on ${port} port.`);
})