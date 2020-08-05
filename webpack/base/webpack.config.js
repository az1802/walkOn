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