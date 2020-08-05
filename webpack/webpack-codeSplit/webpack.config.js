const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
        }]
    },
    optimization: {
        splitChunks: { //不管是同步代码的分割还是异步代码的分割这个参数的配置都会有作用。分割的流程逻辑从第一个配置项往下走
            // chunks: "async", //async:只对异步的代码做代码分割
            chunks: "all", // 均做分割(若不满足下面配置的条件也不会做分割)
            minSize: 30000, //当最终的包大于这个大小的时候才会做代码分割
            maxSize: 100000, //当分割的包的大小超过这个值的时候会再再次对这个包做分割看能否继续拆分
            minChunks: 1, //当一个模块被公用了多少次的时候才做代码分割
            maxAsyncRequests: 5, //最多能有多个异步分割的包
            maxInitialRequests: 3, //同步的代码最多分割成多少个包
            automaticNameDelimiter: '~', //导出文件名称的连接符
            name: true,
            cacheGroups: { //定义chunk分组的规则
                vendors: {
                    test: /[\\/]node_modules[\\/]/, //满足条件会分配到vendors组内
                    priority: -10, //当chunk满足多个分割组的条件的时候依次来判断该chunk分割到哪个组里面
                    filename: "vendors.js" //异步打包的模块不能使用filename
                },
                // default: false,
                default: { //不符合前面的要求分配到defult组
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true //模块互相引用的时候如果a内部引用b,b已经在前面被处理并且分配到其它组别此时b就不会打包到a所在的组件中
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "index.html")
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ]
}

module.exports = webpackConfigObj