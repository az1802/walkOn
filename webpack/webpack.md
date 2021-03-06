# Webpack

### 基础使用

### 配置相关
>context

  context: path.resolve(__dirname, "app")
  默认使用当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

>entry
```javascript
entry: {
  home: "./home.js",
  about: "./about.js",
  contact: "./contact.js"
}
```
  可以定义多个入口文件。
  string | [string] | object { <key>: string | [string] } | (function: () => string | [string] | object { <key>: string | [string] })
  
>output

  filename: '[name].js' 生成的文件名
  [hash]  模块标识符(module identifier)的 hash
  [chunkhash]chunk 内容的 hash
  [name]模块名称
  [id]模块标识符(module identifier)
  [query]模块的 query，例如，文件名 ? 后面的字符串


  path:path:path.resolve(__dirname,"./dist")   生成文件的地址

>devtool
  SourceMap是一种映射关系。当项目运行后，如果出现错误，错误信息只能定位到打包后文件中错误的位置。如果想查看在源文件中错误的位置，则需要使用映射关系，找到对应的位置。
  开发环境中建议使用 cheap-module-eval-source-map
  生成环境中建议使用 cheap-module-source-map
```javascript
{
    // devtool:"none",//只能显示打包文件错误的代码行《无法查找原文件出错的代码行
    // devtool:"source-map", //会单独生成一个map文件映射原代码文件
    // devtool:"cheap-source-map",//没有列映射(column mapping)的 source map
    // devtool:"inline-source-map",//source map转换为DataUrl后添加到bundle中,没有单独source map文件
    // devtool:"cheap-module-source-map",//没有列映射source map同时会将第三方模块化的错误地址也显示出来
    // devtool:"eval",//打包后的代码通过eval()来建立source map关系的
}
```

>devserver 使用中间服务器可以开启热更新,请求转发等任务

```javascript
{
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
    }
}
```

>treeShaking摇树进行代码优化
设置optimization配置。
webpack v4 开始新增了一个 sideEffects 特性，通过给 package.json 加入 sideEffects: false 声明该包模块是否包含 sideEffects(副作用)，从而可以为 tree-shaking 提供更大的优化空间。

```javascript
{
    optimization: {
        usedExports: true, //mode为production 使用sideEffects会自动的进行摇枝处理 development模式则需要添加这个配置用来显示相信模块引用的信息
        minimize: false, //对输出代码进行压缩
    },
}
// 在package.json中添加  
// "sideEffects": false   代码没有作用用可以放心的tree shaking
// "sideEffects": ["*.css"]  css文件存在作用,针对css文件不使用tree shaking

// 打包后的代码表示模块提供了add mul方法但是只是用了add放大。只有在production生产环境中mul部分的代码才会被真正的移除
/*! exports provided: add, mul */
/*! exports used: add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {
```

>codeSplit 代码分割
  业务中我们经常使用一些第三方库而这些库是不用经常更新的。每次只要更新业务代码的包即可。此时就需要将第三方库的代码独立打包分离。这样每次请求只会请求更新的业务代码。而第三方库的代码会请求缓存。[查看具体配置项](https://www.webpackjs.com/plugins/split-chunks-plugin/);

  Chunck:ebpack中专用的术语用于管理webpack内部的打包进程。bundle由许多chunk组成，chunk有几种类型，比如说“入口”和“子块”。通常chunk和输出的bundle一一对应，但是，有些是一对多的关系。

```javascript
// 使用配置的方式进行代码分割
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

// 使用异步导入的方法进行模块的打包会自动的进行分离
// 引入babel-plugin-dynamic-import-webpack插件,然后在代码中使用异步导入,打包的时候会自动的进行分割一个异步包会自动导出为一个模块
function getLodash() {
    return import("lodash").then(({
        default: _
    }) => {
        return "lodash"
    })
}
getLodash().then(data => {
    console.log(data)
})

// 对分割出来的代码名称进行重命名(使用插件的方式)

```

  打包文件的依赖及大小分析,便于优化.


>代码分割分析器
1 打包执行中增加分析文件的输出  webpack --profile --json > stats.json --config webpack.config.js
通过[webpack分析](http://webpack.github.io/analyse)
2 webpack-bundle-analyzer 插件
```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

还可以通过chrome浏览器coverage功能查看代码的覆盖率。可以分析一些首次不使用的代码然后同步异步形式的加载这样可以加快首屏渲染的时间.


>css 代码分割
使用MiniCssExtractPlugin插件。需要将style-loader替换为插件提供的loader.当treeShaking的时候可能会将css形式的文件处理掉。可以使用sideEffect:["*.css"]处理.
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
}


plugins:[
     new MiniCssExtractPlugin({
            filename: "index.css", //输出的css文件名，默认以入口文件名命名(例如main.css)
            chunkFilename: "[name].css" //css文件隔离的块名称
        })
]
```
  
>浏览器缓存
一些第三方模块的包是不会发生变化的,经常发生变化的只有业务逻辑代码.为了使用浏览器的缓存所以一般是在output文件名中加入contenthash.这样第三方库打包出来的文件名不会发生变化。但是业务打包打包出来的文件hash值会发生变化。浏览器会重新加载最新的代码.但是有时候可能即使内容没有发生变化contenthash也会发生改变。此时需要处理optimization:{rumtimeChunk:{name:"runtime"}}此时会多出一个runtime文件。因为main.js与第三方库包文件的代码之间的关联代码(mainfest部分)会放在main.js文件中,所以出现了即使第三方库的包没有发生变化hash值也会发生变化。

>shimming
像jquery,lodash可能不需要被打包到文件中去。但是使用的过程中不不引用会出现一些问题.此时可以通过webpack.Provider插件来提供一些全局变量.
```javascript
{
    plugins:[
        new webpack.ProvidePlugin({ 
            //有部分第三方模块遇到内部没有在头部引入$,_。该插件会自动的在模块头部加入import $ from “jquery”
            //使得模块内部的变量能正常使用,保证模块能够正常运行
            $ : "jquery",
            _ : "lodash",
            _join:["lodash","join"] //精确到模块的方法
        })
    ]
}
```

>环境变量的引用



##### 安装相关包
##### 基础包
webpack webpack-cli

###### loader相关

```javascript
```

`img等文件形式的loader`
file-loader                       处理静态资源文件到指定的目录
```javascript
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
    test:/\.(eot|ttf|svg)$/,//针对字体文件的打包配置
    use:[{
        loader:"file-loader",
    }]
},
```
url-loader                        处理静态资源文件针对一些小的图片文件可以转换成data:image的形式出现在js文件中这样可以减少http的请求数量。
```javascript
{
  test:/\.jpg$/,
  use:[{
      loader:"url-loader", //文件会以data:image的形式生成在js文件中
      options:{
          name:'[name]_[hash:10].[ext]', //输出文件的名称
          outputPath:"images/",//输出文件的目录地址
          limit:2048 ,//超过2048的大小就会输出到images中
      }
  }]
}
```


`css相关的loader`
style-loader                                  将css样式以style标签的形式输入到html页面中
css-loader                                    处理css文件模块化(@import a.css)的引入
sass-loader/stylus-loader/less-loader         处理不同类型的css文件
postcss-loader                                配合插件针对css样式增加一些处理(css3一些样式增加浏览器前缀等)
```javascript
{
    test:/\.css$/,
    use:[
        "style-loader",
        "css-loader",
    ]
},
{
    test:/\.scss$/,
    use:[
        "style-loader",
        {
            loader:"css-loader",
            options:{
                importLoaders:2,  //scss文件内部通过@import引入的scss文件会先试用sass-loader postcss-loader
                module:true, //开始css的模块化打包即当前js引入的css文件只作用于当前js文件,使用方式会不一样
                
            }
        },
        {
            loader:"postcss-loader",
            options:{
                plugins: [
                    require('autoprefixer'),
                    require('cssnano')
                ]
            }
        },
        "sass-loader",
    ]
},
```


`js相关的loader`
主要是处理es6的转换问题。
1 安装babel-loader同时需要安装@babel/core  @babel/preset-env(需要安装此模块对一些模块进行解析.@babel/core只负责核心流程)
2 根目录创建.babelrc文件用于babel配置
3 babel只能处理语法的转换如果需要使用Promise等内置对象则可以import @babel/polyfill
4 如果是再编写第三方类库的时候@babel/polyfill会造成全局污染可以考虑@babel/plugin-transform-runtime以闭包的形式引用不会污染全局。

```javascript
{
    test:/\.js$/,
    exclude: /node_modules/,
    use:["babel-loader"]
}

// .babelrc文件配置
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns":"usage", //当增加垫片库的时候会按需添加,而不会把垫片库完全打包进去
                "targets": { //根据浏览器配置去进行打包对一些都支持的语法不转换
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1",
                },
            }
        ]
    ],
    "plugins":[
        [
            "@babel/plugin-transform-runtime", //使用@babel/ployfill会污染全局环境,这种以闭包的形式引入不会污染全局环境。这样再写一些类库的时候会更好
            {
            "absoluteRuntime": false,
            "corejs": 2,
            "helpers": true,
            "regenerator": true,
            "useESModules": false,
            "version": "7.0.0-beta.0"
            }
        ]
    ]
}

// index.js
import @babel/polyfill
```

`vue相关的loader`


`react相关的loader`
在babel的基础上安装@babel/preset-react然后添加配置即可.
```javascript
{
    "presets": [
        [
          "@babel/preset-env",
          {
              "useBuiltIns":"usage", //当增加垫片库的时候会按需添加,而不会把垫片库完全打包进去
              "targets": { //根据浏览器配置去进行打包对一些都支持的语法不转换
                  "edge": "17",
                  "firefox": "60",
                  "chrome": "67",
                  "safari": "11.1",
              },
          }
        ],
        [
          "@babel/preset-react",
          {
            // "pragma": "dom", // default pragma is React.createElement
            // "pragmaFrag": "DomFrag", // default is React.Fragment
            // "throwIfNamespace": false // defaults to true
          }
        ]
      ]
}
```






###### plugins相关

html-webpack-plugin  生成html文件
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
new HtmlWebpackPlugin({
    template:path.resolve(__dirname,"src/index.html")
})
```

clean-webpack-plugin 清楚目录下的所有文件
```javascript
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
new CleanWebpackPlugin()
```

WebpackManifestPlugin  以直接将数据提取到一个json文件


##### 配置对象
webpack.config.js内部可以到导出多种形式。
1 函数 ---- 会传入env,argv两个参数。env表示为命令行第一个参数环境变量 后续变脸会合成map对象传入
2 Promise ---可以到处为一个函数返回一个promise对象.
3 数组 --- [{}][{}] 可以针对不同的环境生成不同的打包文件.






### 面试
###### 与gulp、grunt的区别
    均是前端构建工具.grunt和gulp是基于任务和流（Task、Stream）的,webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。
    gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系.webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工.gulp更像后端开发者的思路，需要对于整个流程了如指掌,webpack更倾向于前端开发者的思路.


###### webpack打包构建流程
    1 初始化参数：从配置文件和命令行语句中读取与合并参数，得出最终的参数
    2 开始编译：用上一步得到的参数初始化Compiler对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
    3 确定入口：根据配置中的 entry 找出所有的入口文件；
    4 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
    5 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
    6 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
    7 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
    在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用Webpack提供的API改变Webpack的运行结果

###### webpack的entry和output
  entry入口,告诉webpack要使用那个模块作为构建项目的起点.
  output出口,告诉webpack在哪里输出它打包好的代码以及如何命名.

###### webpack Hash Chunkhash Contenthash的区别
    Hash和整个项目的构建相关,只要项目文件有修改,整个项目构建的hash值就会更改.
    Chunkhash和Webpack打包的chunk有关,不同的entry会生出不同的chunkhash.
    Contenthash根据文件内容来定义hash,文件内容不变,则contenthash不变.

###### webpack的loaders和plugins?
    Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
    Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

###### 有哪些常见的loader和plugins
    file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
    url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
    source-map-loader：加载额外的 Source Map 文件，以方便断点调试image-loader：加载并且压缩图片文件
    babel-loader：把 ES6 转换成 ES5css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
    eslint-loader：通过 ESLint 检查 JavaScript 代码
    style-loader 把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
    css-loader
    sass-loader/less-loader/stylus-loader

###### 如何自定义loader和plugin
    编写Loader时要遵循单一原则，每个Loader只做一种"转义"工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。 此外webpack还为开发者准备了开发loader的工具函数集——loader-utils。然后这样链式的处理得到最终的文件。
    相对于Loader而言，Plugin的编写就灵活了许多。 webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

    plugin中常见的插件钩子
```javascript
function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
  // 异步插件的模式 提供callback回调 通知操作完毕
 compiler.plugin("emit", function(compilation, callback) {

    // 做一些异步处理……
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });
};

module.exports = HelloWorldPlugin;


```



###### webpack HMR热更新的原理
  HMR原理示意图
![alt HMR原理](./assets/HMR原理.jpg)
* watch 编译过程、devServer 推送更新消息到浏览器
* 浏览器接收到服务端消息做出响应
* 对模块进行热更新或刷新页面


###### webpack的source map
Source Maps不仅仅是一个.map后缀的文件，而是由浏览器、.map文件生成器和.map文件组成的一套技术方案。
.map文件，其实是一个关系映射文件，用于存放源码和编译后代码的文件、行号、列号和变量名的映射关系；
.map文件生成器，每种预处理器(Lessc、Closure、cljsc等)都可通过可选项设置如何生成.map文件；
浏览器，Chrome和FF均提供Source Maps支持（IE11依然不支持），浏览器实质上提供的是.map文件解析引擎，根据.map文件内容加载源文件和在调试模式中关联源码和编译后代码。另外编译后代码最后一行会追加一行指向.map文件语句，指向的方式有http uri scheme 和 data uri scheme两种。
http uri scheme，格式为 //# sourceMappingURL=sample.js.map?rel=1420853090118 
data uri scheme，就是通过对.map文件进行base64编码，然后编译后代码最后一行以data uri scheme的形式引入.map文件内容，格式为 //# sourceMappingURL=data:application/json;base64,Asdi....... 
```javascript
{
    "version":3, //Source map的版本，目前为3；
    "file":"/C:/lein/myapp/out/sample.js",//编译后的文件路径；
    "sources":["sample.cljs?rel=1420853090124"],//源码文件路径数组；
    "sourceRoot":"",""://源码文件的所在目录
    "mappings":"AAAA;;AAEA,oBAAA,pBAAMA,yCAAYC;AAAlB,AACC,AAAMC,YAAWD;;AACjB,GAAI,CAAA,QAAOA;AACV,OAACE,qBAAW,CAAA,MAAKF;;AADlB",//，记录源码与编译后代码的位置信息。
    "names":["sample/becomeGeek", "process", "js/console", "becomeGeek"]//转换前的所有变量名和属性名。
    }
```
mappings中
第一层是行对应，以分号（;）表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。
第二层是位置对应，以逗号（,）表示，每个逗号对应转换后源码的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。
第三层是位置转换，以VLQ编码表示，代表该位置对应的转换前的源码位置。
每个位置使用五位,表示五个字段,第五位不是必须的可以被省略
- 第一位，表示这个位置在（转换后的代码的）的第几列。
- 第二位，表示这个位置属于sources属性中的哪一个文件。
- 第三位，表示这个位置属于转换前代码的第几行。
- 第四位，表示这个位置属于转换前代码的第几列。
- 第五位，表示这个位置属于names属性中的哪一个变量。

###### webpack的runtime
 runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行时，webpack 用来连接模块化的应用程序的所有代码。runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。

###### webpack的manifest
那么，一旦你的应用程序中，形如 index.html 文件、一些 bundle 和各种资源加载到浏览器中，会发生什么？你精心安排的 /src 目录的文件结构现在已经不存在，所以 webpack 如何管理所有模块之间的交互呢？这就是 manifest 数据用途的由来……
当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"，当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。
所以，现在你应该对 webpack 在幕后工作有一点了解。“但是，这对我有什么影响呢？”，你可能会问。答案是大多数情况下没有。runtime 做自己该做的，使用 manifest 来执行其操作，然后，一旦你的应用程序加载到浏览器中，所有内容将展现出魔幻般运行。然而，如果你决定通过使用浏览器缓存来改善项目的性能，理解这一过程将突然变得尤为重要。
通过使用 bundle 计算出内容散列(content hash)作为文件名称，这样在内容或文件修改时，浏览器中将通过新的内容散列指向新的文件，从而使缓存无效。一旦你开始这样做，你会立即注意到一些有趣的行为。即使表面上某些内容没有修改，计算出的哈希还是会改变。这是因为，runtime 和 manifest 的注入在每次构建都会发生变化。

###### webpack的chunk

###### 如何对bundle体积进行监控和分析

###### 如何实现按需加载
  通过import来确定加载的时机

###### webpack中tree shaking原理
它的工作是使用编辑器判断出某些代码是不可能执行的，然后清除。
Tree-shaking是依赖ES6模块静态分析的，ES6 module的特点如下：
1 只能作为模块顶层的语句出现
2 import 的模块名只能是字符串常量
3 import binding 是 immutable的



###### webpack如何提取公共模块

###### webpack有哪些方法优化前端性能

###### webpack如何配置单页面应用和多页面应用

###### 如何提高webpack的构建速度
  1 多入口情况下，使用CommonsChunkPlugin来提取公共代码
  2 通过externals配置来提取常用库利
  3 用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。
  4 使用Happypack 实现多线程加速编译
  5 使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度
  6 使用Tree-shaking和Scope Hoisting来剔除多余代码
  7 利用缓存提升二次构建速度 babel-loader开启cacheDirectory参数,cache-loader放在其他loader之前,hard-source-webpack-plugin为模块提供中间缓存
  8 exclude include来缩小构建的目标加快速度
  9 resolve来告诉模块的具体位置,检测的文件后缀名,采取的入口文件加快模块的搜索速度
  10 动态垫片库来即按需加载垫片库而不是全部打包进去.


###### npm打包时有哪些注意事项
Npm是目前最大的 JavaScript 模块仓库，里面有来自全世界开发者上传的可复用模块。你可能只是JS模块的使用者，但是有些情况你也会去选择上传自己开发的模块。 关于NPM模块上传的方法可以去官网上进行学习，这里只讲解如何利用webpack来构建。
NPM模块需要注意以下问题：
1 支持CommonJS模块化规范，所以要求打包后的最后结果也遵守该规则。
2 Npm模块使用者的环境是不确定的，很有可能并不支持ES6，所以打包的最后结果应该是采用ES5编写的。并且如果ES5是经过转换的，请最好连同SourceMap一同上传。
3 Npm包大小应该是尽量小（有些仓库会限制包大小）
4 发布的模块不能将依赖的模块也一同打包，应该让用户选择性的去自行安装。这样可以避免模块应用者再次打包时出现底层模块被重复打包的情况。
5 UI组件类的模块应该将依赖的其它资源文件，例如.css文件也需要包含在发布的模块里。
基于以上需要注意的问题，我们可以对于webpack配置做以下扩展和优化：

1 CommonJS模块化规范的解决方案： 设置output.libraryTarget='commonjs2'使输出的代码符合CommonJS2 模块化规范，以供给其它模块导入使用
2 输出ES5代码的解决方案：使用babel-loader把 ES6 代码转换成 ES5 的代码。再通过开启devtool: 'source-map'输出SourceMap以发布调试。
3 Npm包大小尽量小的解决方案：Babel 在把 ES6 代码转换成 ES5 代码时会注入一些辅助函数，最终导致每个输出的文件中都包含这段辅助函数的代码，造成了代码的冗余。解决方法是修改.babelrc文件，为其加入transform-runtime插件
4 不能将依赖模块打包到NPM模块中的解决方案：使用externals配置项来告诉webpack哪些模块不需要打包。
5 对于依赖的资源文件打包的解决方案：通过css-loader和extract-text-webpack-plugin来实现，配置如下：


###### webpack本地开发怎么解决跨域的
通过配置代理,将请求转发到中间层,中间层服务器请求真正的数据服务,获取数据之后再返回数据带代理

###### webpack5有哪些新的特点
[webpack5](https://juejin.im/post/6844904169405415432)
1 优化持久缓存 (webpack4中需要配置cache-loader等操作,v5默认memory)
2 优化长期缓存
3 更好的TreeShaking
4 Nodejs的polyfill脚本被移除
  最开始，Webpack 目标是允许在浏览器中运行 Node 模块。但是现在在 Webpack 看来，大多模块就是专门为前端开发的。在 v4 及以前的版本中，对于大多数的 Node 模块会自动添加 polyfill 脚本，polyfill 会加到最终的 bundle 中，其实通常情况下是没有必要的。在 v5 中将停止这一行为
5 模块联邦
  让 Webpack 达到了线上 runtime 的效果，让代码直接在独立应用间利用 CDN 直接共享，不再需要本地安装 NPM 包、构建再发布了！
