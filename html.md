#### html Doctype声明
告诉及其使用哪个版本的HTML规范来渲染文档。DOCTYPE不存在或形式不正确会导致HTML文档以混杂模式呈现。
#### jpg和png格式的图片有什么区别
1 png图片大小大于jpg图片
2 png图片可以进行无损压缩,jpg图片会牺牲图片质量
#### html SEO
1 meta元数据标签的使用(keywords description)
2 标签语义化(h1-h6标签 strong加强的语义标签等合理使用 img表填使用alt属性 a标签添加title属性)
3 信息页面和频道,网站首页改为静态页面利于引擎收录
4 内边扁平化,前台过多不利于搜索引擎查找
5 不使用iframe标签
#### a标签 target属性
_blank 新打开一个窗口
_self 自身标签跳转
_parent 在父级窗口打开,如果这个引用是在窗口或者在顶级框架中，那么它与目标 _self 等效。
_top 将会清除所有被包含的框架并将文档载入整个浏览器窗口
#### 页面导入样式时，使用link和@import有什么区别？
1 link除了加载css还可以定义RSS等其他事务.@import属于css范畴,只能加载css.
2 link引用css和页面载入同时进行.@import需要页面完全加载以后加载而且@import被引用的css会等到引用它的css文件被加载完才开始加载
3 link无兼容性问题。@import是css2.1提出来的低版本的浏览器不支持
4 link支持js的方式去改变内容,@import不支持
5 link的权重高于@import
#### 浏览器内核
1 Trident( MSHTML )：IE MaxThon TT The World 360 搜狗浏览器
2 Geckos：Netscape6及以上版本 FireFox Mozilla Suite/SeaMonkey
3 Presto：Opera7及以上(Opera内核原为：Presto，现为：Blink)
4 Webkit：Safari Chrome
#### html5新特性
1 canvas
2 video和audio元素
3 本地离线存储,localStorage长期存储数据,浏览器关闭后数据不丢失,sessionStorage的数据在浏览器关闭之后删除
4 语义化元素article footer header nav section
5 位置API Geolocation
6 表单控件 time date url search 
7 web worker 运行在后台的js独立于其他脚本不会影响页面的性能.
8 拖放API drag drop
#### HTML5文件离线存储
在线情况下，浏览器发现HTML头部有manifest属性，它会请求manifest文件，如果是第一次访问，那么浏览器就会根据manifest文件的内容下载相应的资源，并进行离线存储。如果已经访问过并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面。然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不会做任何操作，如果文件改变了，那么就会重新下载文件中的资源，并且进行离线存储。例如，

在页面头部加入manifest属性。在cache.manifest文件中编写离线存储的资源
```html
<html manifest='cache.manifest'>
CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
Resourse/logo.png
FALLBACK:
 //offline.html
```
#### 如何实现浏览器内多个标签页之间的通信?
1 WebSocket SharedWorker
2 也可以调用 localstorge、cookies 等本地存储方式。 localstorge 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信。
注意：Safari 在无痕模式下设置 localstorge 值时会抛出QuotaExceededError 的异常
#### Canvas和SVG图形之间的区别是什么？
SVG表示（scalable vector graphics）可缩放矢量图形。这是一个基于文本的图形语言，它可以绘制使用文本、线、点等的图形，因此可以轻巧又快速地渲染。
canvas画布是一个可以在其上绘制图形的HTML区域。用于绘制和遗忘类似动漫和游戏的场画。它就快多了，因为没有必要记住后面的东西。我们不需要将事件处理程序与图形对象关联，因为我们不需要引用它们。
#### 什么是WebSQL？
#### 
