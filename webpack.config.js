const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const GetStyleLoader = (mode, styleRegex) => {
    const loader = { test: styleRegex };
    switch (styleRegex) {
        case /\.css$/:
            Object.assign(loader, 
                {
                    use: [ 
                        mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader"                        
                    ]
                });
            break;
        case /\.scss$/:
            Object.assign(loader, 
                {
                    use: [
                        mode === "production" ? MiniCssExtractPlugin.loader : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: true
                            }
                        },
                        "sass-loader"
                    ]
                });
            break;
        default:
            break;
    };
    return loader;
}

module.exports = function(mode, args) {
    const _mode = mode;
    return {
        mode: _mode === "production" ? "production" : "development",

        entry: {
            index: "./src/index.js"
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "assets/[hash].js",
            publicPath: "/"
        },

        devServer: {
            historyApiFallback: true,
            port: 8080,
            hot: true,
            open: true
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: "/node_modules",
                    use: [
                        {                            
                            //NOTE:proposal class properties 플러그인이 없으면 classproperties is not enabled 에러 발생
                            //플러그인만 옵션에 넣으면 에러가 계속되어 babelrc 파일을 지우고 프리셋을 전부 이쪽으로 옮겨와야됨                            
                            loader : "babel-loader",
                            options: {
                                presets: ["@babel/preset-env", "@babel/preset-react"],
                                plugins: [
                                    "@babel/plugin-proposal-class-properties"
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: 
                            {
                                minimize: true
                            }
                        }
                    ]
                },
                GetStyleLoader(_mode, /\.css$/),
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 1,
                                modules: true
                            }
                        }, "sass-loader"]
                },
                {
                    test: /\.(png|jpg|svg)/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "assets"
                            }
                        }
                    ]
                },
                {
                    test: /\.ttf/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "assets"
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "assets/[hash].css",
            }),
            new CleanWebpackPlugin()
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
                name: "[chunkhash]"
            }
        }
    }
}