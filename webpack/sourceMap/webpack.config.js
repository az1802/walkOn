const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpackConfigObj = {
    mode:"development",
    context:__dirname,
    // devtool:"none",//只能显示打包文件错误的代码行《无法查找原文件出错的代码行
    // devtool:"source-map", //会单独生成一个map文件映射原代码文件
    // devtool:"cheap-source-map",//没有列映射(column mapping)的 source map
    // devtool:"inline-source-map",//source map转换为DataUrl后添加到bundle中
    // devtool:"cheap-module-source-map",//没有列映射source map同时会将第三方模块化的错误地址也显示出来
    // devtool:"eval",//打包后的代码通过eval()来建议source map关系的
   
    entry:{
        app:"./src/index.js"
    },
    output:{
        filename:"[name][hash].js",
        path:path.resolve(__dirname,"./dist")
    },
    module:{
        rules:[

        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"index.html")
        }),
        new CleanWebpackPlugin()
    ]
}

module.exports = webpackConfigObj