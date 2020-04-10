import { isDevelopment, env, isProduction } from "../../src/config/env";
import { joinPath } from "../../src/utils/paths";
import { getClientModule } from "./module";
import { getResolve } from "./resolve";
import { getClientPlugins } from "./plugins";
import { getDevTool } from "../../src/config/devtool";

//기호때문에 이스케이프 처리해야됨.
const hmrScript = `webpack-hot-middleware/client?reload=true`;

const getEntry = () => {
    return isDevelopment ? [hmrScript, "./src/client.js"] : ["./src/client.js"]
};

module.exports = webpackEnv => {
    const isAnalyze = webpackEnv.analyze;

    return {
        mode: env,
        name: "client",
        target: "web",
        cache: isDevelopment,
        devtool: getDevTool(),
        entry: getEntry(),
        output: {
            path: joinPath(isProduction ? "dist": "", "public/assets"),
            filename: `[name]${isProduction ? ".[hash]" : ""}.js`,
            publicPath: "/assets/",
        },

        module: getClientModule(),

        resolve: getResolve(),

        plugins: getClientPlugins(),

        optimization: {
            splitChunks: {
                name: "vendors",
                chunks: "all"
            }
        }        
    }
};