const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

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

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            //有部分第三方模块遇到内部没有在头部引入$,_。该插件会自动的在模块头部加入import $ from “jquery”
            //使得模块内部的变量能正常使用,保证模块能够正常运行
            $: "jquery",
            _: "lodash",
            _join: ["lodash", "join"] //精确到模块的方法
        })
    ]
}

module.exports = webpackConfigObj