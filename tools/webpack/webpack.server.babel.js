import { env } from "../../src/config/env";
import { getDevTool } from "../../src/config/devtool";
import { joinPath } from "../../src/utils/paths";
import { getServerModule } from "./module";
import { getResolve } from "./resolve";
import nodeExternals from "webpack-node-externals";
import { getServerPlugins } from "./plugins";

module.exports = {
    mode: env,
    name: "server",
    target: "node",
    devtool: getDevTool(),
    node: false,
    entry: ["./src/server.js"],
    output: {
        filename: "server.js",
        path: joinPath("dist"),
        libraryTarget: "commonjs2"
    },

    module: getServerModule(),

    resolve: getResolve(),

    externals: [ "@loadable/component", nodeExternals()],

    plugins: getServerPlugins(),
};