import LoadablePlugin from "@loadable/webpack-plugin";
import ExtractCssChunksWebpackPlugin  from "extract-css-chunks-webpack-plugin";
import { isDevelopment, env } from "../../src/config/env";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import copyWebpackPlugin from "copy-webpack-plugin";
import { joinPath } from "../../src/utils/paths";
import WebpackManifestPlugin from "webpack-manifest-plugin";
import FriendlyErrorsWebpackPlugin from "friendly-errors-webpack-plugin";

export const getClientPlugins = () => {
    return [
        new LoadablePlugin(),
        new ExtractCssChunksWebpackPlugin({
            filename: isDevelopment ? "[name].css" : "[name].[hash].css"
        }),
        ...(isDevelopment
            ? [
                new webpack.HotModuleReplacementPlugin(),
            ]
            : [
                new CleanWebpackPlugin(),
                new copyWebpackPlugin([{
                    from: "./public",
                    to: joinPath("dist/public"),
                    ignore: [".DS_Store"]
                }])
            ]),
        new WebpackManifestPlugin({
            fileName: "manifest.json",
            basePath: "./dist/"
        }),
        new FriendlyErrorsWebpackPlugin()
    ];
};

export const getServerPlugins = () => {
    return [
        new webpack.IgnorePlugin(/webpack\.client\.babel/),
        new webpack.EnvironmentPlugin({ NODE_ENV: `${env}` }),
        new ExtractCssChunksWebpackPlugin({
            filename: isDevelopment ? "[name].css" : "[name].[hash].css"
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["server.js", "server.js.map", "./*.css", "./*.css.map"]
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new LoadablePlugin()
    ];
};