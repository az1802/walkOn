const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfigObj = {
    mode: "development",
    context: __dirname,
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: "[name][hash].js",
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [{
                test: /\.jpg$/,
                use: [
                    "file-loader",
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // "style-loader",
                    {
                        loader: MiniCssExtractPlugin.loader, //css分离器
                        options: {
                            esModule: true,
                        }
                    },
                    {
                        loader: "css-loader",
                        // options: {
                        //     importLoaders: 2, //scss文件内部通过@import引入的scss文件会先试用sass-loader postcss-loader
                        //     module: true, //开始css的模块化打包即当前js引入的css文件只作用于当前js文件,使用方式会不一样

                        // }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer'),
                                require('cssnano')
                            ]
                        }
                    },
                    "sass-loader",
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "index.css", //输出的css文件名，默认以入口文件名命名(例如main.css)
            chunkFilename: "[name].css" //css文件隔离的块名称
        })
    ]
}

module.exports = webpackConfigObj