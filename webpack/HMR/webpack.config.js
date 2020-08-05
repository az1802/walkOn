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
    devServer:{
        contentBase:"./dist",//服务器监听文件变化的目录
        open:true,//是否自动打开浏览器
        port:8082,//服务使用的端口号
        hot:true,//热更新
        hotOnly:true,//true表示编译失败时不会自动刷新页面
        noInfo:false,//类似webpack bundle启动或保存的信息将会被隐藏，Errors和warnings仍会被显示。
        overlay: {
            warnings: true,
            errors:true
        },//在浏览器上全屏显示编译的errors或warnings。
        quiet:true,//当启用该配置，除了初始化信息会被写到console中，其他任何信息都不会被写进去。errors和warnings也不会被写到console中。
        https:false,//默认情况下使用http协议可以配置使用https协议
        compress: true,//http请求是否启用gzip压缩,可以加快传输速度
        headers: { //热更新请求中携带的表头信息
            "X-Custom-Foo": "bar"
        },
        historyApiFallback:true,//(boolean,object)当使用html5 history api,将会在响应404时返回index.html。想要开启该功能进行如下设置。
        proxy:{//一切的请求都可以通过代理进行转发
            '/react/api':{
                target:"http://www.dell-lee.com",
                pathRewrite:{
                    'header.json' :'demo.json'  //文件请求的转换
                }
            }
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"index.html")
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = webpackConfigObj