import { joinPath } from "../../src/utils/paths";
import ExtractCssChunksWebpackPlugin from "extract-css-chunks-webpack-plugin";
import { isDevelopment } from "../../src/config/env";

export const getClientModule = () => {
    return {
        rules: [
            {
                test: /\.jsx?$/,
                include: joinPath("src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-hot-loader",
                    },
                    {
                        loader: ExtractCssChunksWebpackPlugin.loader,
                        options: {
                            reloadAll: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: isDevelopment ? "[path]__[name]__[local]" : "[hash:base64]"
                            }       
                        }
                    },
                    "sass-loader"
                ]
            },                           
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: "file-loader",                        
                    }
                ]
            },
            {
                test: /\.ttf/,
                use: [
                    {
                        loader: "file-loader",                        
                    }
                ]
            }
        ]
    };
};

export const getServerModule = () => {
    return {
        rules: [
            {
                test: /\.jsx?$/,
                include: joinPath("src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "css-hot-loader",
                    },
                    {
                        loader: ExtractCssChunksWebpackPlugin.loader,
                        options: {
                            reloadAll: true
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: isDevelopment ? "[path]__[name]__[local]" : "[hash:base64]"
                            }       
                        }
                    },
                    "sass-loader"
                ]
            },                 
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: "file-loader",                        
                    }
                ]
            },            
            {
                test: /\.ttf/,
                use: [
                    {
                        loader: "file-loader",                        
                    }
                ]
            }
        ]
    };
};