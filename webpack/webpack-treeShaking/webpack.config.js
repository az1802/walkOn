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
        rules: [

        ]
    },
    optimization: {
        usedExports: true, //mode为production 使用sideEffects会自动的进行摇枝处理 development模式则需要添加这个配置用来显示相信模块引用的信息
        minimize: false, //对输出代码进行压缩
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new CleanWebpackPlugin()
    ]
}

module.exports = webpackConfigObj