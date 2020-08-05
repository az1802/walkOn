const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpackConfigObj = {
    mode:"development",
    context:__dirname,
    entry:{
        app:"./src/index.js"
    },
    output:{
        filename:"[name][hash].js",
        path:path.resolve(__dirname,"./dist")
    },
    module:{
        rules:[
            {
                test:/\.(jpeg|png)$/,
                use:[{
                    loader:"file-loader",
                    options:{
                        name:'[name]_[hash:5].[ext]', //输出文件的名称
                        outputPath:"images/",//输出文件的目录地址
                    }
                }]
            },
            {
                test:/\.jpg$/,
                use:[{
                    loader:"url-loader", //文件会以data:image的形式生成在js文件中
                    options:{
                        name:'[name]_[hash:10].[ext]', //输出文件的名称
                        outputPath:"images/",//输出文件的目录地址
                        limit:204800 ,//超过2048的大小就会输出到images中
                    }
                }]
            }


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