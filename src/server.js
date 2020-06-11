import express from "express";
import { joinPath } from "./utils/paths";
import { isDevelopment, isProduction } from "./config/env";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import serveFavicon from "serve-favicon";
import { port } from "./config/url";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { getHtmlString } from "./utils/htmlString";
import React from "react";
import { configureStore } from "./utils/configureStore";
import { Provider } from "react-redux";
import { matchRoutes, renderRoutes } from "react-router-config";
import routes from "./routes";
import { AppContainer } from "react-hot-loader";

const app = express();

const getExtractor = () => {
    const statsFile = joinPath(isProduction ? "dist" : "", "public/assets/loadable-stats.json");
    const extractor = new ChunkExtractor({ statsFile });
    return extractor;
};

const loadBranchData = (store, path) => {      
    const branch = matchRoutes(routes, path);         
    const promises = branch.map(({route, match}) => {             
        if (route.loadData) {                        
            return Promise.all(                
                route.loadData({ params: match.params, getState: store.getState })
                .map((item) => {                    
                    return store.dispatch(item);
                })
            );
        }        
        return Promise.resolve(null);
    });    
    return Promise.all(promises);
};

if(isDevelopment) {
    const webpack = require("webpack");
    const getWebpackClientConfig = require("../tools/webpack/webpack.client.babel");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackClientConfig = getWebpackClientConfig({});
    const compiler = webpack(webpackClientConfig);
    const instance = webpackDevMiddleware(compiler, {
        // logLevel: "silent",
        stats: "minimal",        
        publicPath: webpackClientConfig.output.publicPath,
        hot: true,
        serverSideRender: true,
        writeToDisk(filePath) {
            return /loadable-stats/.test(filePath) || /manifest/.test(filePath);
        }
    });
    app.use(instance);
    
    instance.waitUntilValid(() => {
        console.log(`😎 server is running on ${port} port.`);
    });

    app.use(webpackHotMiddleware(compiler));
};

app.use(express.static(joinPath(isProduction ? "dist" : "", "public")));

app.use(serveFavicon(joinPath(isProduction ? "dist" : "", "public/favicon.ico")));

app.get("*", async (req, res) => {            
    const {store} = configureStore({url: req.url});       
    loadBranchData(store, req.path).then(async () => {        
        const extractor = getExtractor();
        const context = {};                    
        const app = (
            <ChunkExtractorManager extractor={extractor}>
                <AppContainer>
                    <Provider store={store}>
                        <StaticRouter location={req.url} context={context}> 
                            {renderRoutes(routes)}
                        </StaticRouter>
                    </Provider>
                </AppContainer>    
            </ChunkExtractorManager>
        );        
        const content = renderToString(app);
        const scriptTags = extractor.getScriptTags();
        const styleTags = extractor.getStyleTags();
        const linkTags = extractor.getLinkTags();                   
        const htmlString = getHtmlString(linkTags, styleTags, content, scriptTags);            
        res.send(htmlString);
    }).catch(err => {
        console.log(`😱 Rendering Error: ${err.stack}`);
    });     
});

const server = app.listen(port, () => {    
});