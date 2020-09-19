# css
### 常见定位方案
* 普通流
* 浮动
* 绝对定位

### css属性继承
1 字体属性 font font-family
2 文本系列属性 text-indent text-align
3 光标属性 cursor
4 元素可见性 visibilty
### css权重
选择器的特殊性值分为四个等级，如下：
（1）标签内选择符x,0,0,0
（2）ID选择符0,x,0,0
（3）class选择符/属性选择符/伪类选择符    0,0,x,0
（4）元素和伪元素选择符0,0,0,x
### 常见的css hack
1 reset.css浏览器之间样式差异的抹平
2 chrome 小于12px显示为12px的解决方法 -webkit-transform:scale(0.5)
3 浏览器样式前缀 -webkit- -moz-

### 绝对定位元素与非绝对定位元素的百分比计算的区别
绝对定位元素的宽高百分比是相对于临近的position不为static的祖先元素的paddingbox来计算的。
非绝对定位元素的宽高百分比则是相对于父元素的contentbox来计算的。

### BFC
##### 触发条件
* body元素
* float元素
* position(absolute fixd)
* display(inline-block,table-cells,flex)
* overflow出visible以外的值

##### 规则
* BFC内部子元素在垂直方向边距发生重叠
* BFC独立的容器内部怎样与外部无关
* BFC区域不与旁边的float box区域重叠
* 计算BFC高度的时候,浮动元素也参与计算

##### 应用
* 清楚浮动
* 放在不同的BFC容器中可以避免margin重叠
* BFC阻止浮动元素覆盖






### IFC
（1）行级上下文内部的盒子会在水平方向，一个接一个地放置。
（2）当一行不够的时候会自动切换到下一行。
（3）行级上下文的高度由内部最高的内联盒子的高度决定。
### base64编码
1 减少一个http请求
2 编码后的大小比原文件小1/3
3 不兼容ie8以下



### 移动端布局
##### 基本步骤
1设置meta标签
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```
2 media媒体查询,针对不同设备设置不同的宽度范围
```css
@media screen and (max-width:960px ){
    div{
        color:red;
    }
}
/** iPad **/
@media only screen and (min-width: 768px) and (max-width: 1024px) {}
/** iPhone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {}
```
##### flex弹性布局

### css变量值
```css
/* 获取dom属性值 */
div{
    color:attr(data-color)
}
/* calc 计算值 */
div{
    width:calc(100%-60)
}
:root{
    --foo:20px
}
div{
    /* 第二个参数作为默认值 */
    color:var(--foo,30px)
}
```



### 浏览器是怎样解析 CSS 选择器的？
样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。只要选择器的子树一直在工作，样式系统就会持续左移，直
到和规则匹配，或者是因为不匹配而放弃该规则。

试想一下，如果采用从左至右的方式读取CSS规则，那么大多数规则读到最后（最右）才会发现是不匹配的，这样做会费时耗能，
最后有很多都是无用的；而如果采取从右向左的方式，那么只要发现最右边选择器不匹配，就可以直接舍弃了，避免了许多无效匹配。

### 设备像素、css 像素、设备独立像素、dpr、ppi 之间的区别？
设备像素指的是物理像素，一般手机的分辨率指的就是设备像素，一个设备的设备像素是不可变的。

css像素和设备独立像素是等价的，不管在何种分辨率的设备上，css像素的大小应该是一致的，css像素是一个相对单位，它是相
对于设备像素的，一个css像素的大小取决于页面缩放程度和dpr的大小。

dpr指的是设备像素和设备独立像素的比值，一般的pc屏幕，dpr=1。在iphone4时，苹果推出了retina屏幕，它的dpr
为2。屏幕的缩放会改变dpr的值。

ppi指的是每英寸的物理像素的密度，ppi越大，屏幕的分辨率越大。

### 什么是 Cookie 隔离？
网站向服务器请求的时候，会自动带上cookie这样增加表头信息量，使请求变慢。
如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，所以不如隔离开
，静态资源放CDN。
因为cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，这样可以降低请
求头的大小，降低请求时间，从而达到降低整体请求延时的目的。
同时这种方式不会将cookie传入WebServer，也减少了WebServer对cookie的处理分析环节，提高了webserver的
http请求的解析速度。

### 什么是替换元素？
通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。因此，<img>、<object>、<video>、<iframe>或者表
单元素<textarea>和<input>和<select>都是典型的替换元素。

### 什么是层叠上下文？
### 隐藏元素的 background-image 到底加不加载？
### 抽离样式模块怎么写，说出思路，有无实践经验
TODO
我的理解是把常用的css样式单独做成css文件……通用的和业务相关的分离出来，通用的做成样式模块儿共享，业务相关的，放
进业务相关的库里面做成对应功能的模块儿。
### 常用css技巧
##### 多行文字使用... 
单行使用
```css
.text-overflow{
    width:100px;/* width需要为一个具体的值 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


/* 多行文字使用省略号 */
.text-overflow{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```


##### 水平居中的方案
* 行内元素直接使用text-aligin
* margin 0 auto  margin值的自动计算
* 绝对定位 top:50% left:50% ;使用transform进行自身的移动垂直居中
* flex和grid布局

##### 垂直居中的方案
* vertical-align : middle;display:inline-block
* flex   display:flex;jusitify-content:center; 或者使用aligin-items:center(整体居中)      align-self:center;
* display:inline-block;使用height = line-height 垂直居中
* table-cell
* position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)
```css
        .parent {
            height: 300px;
            border: 1px solid red;
            position: relative;
        }
        .child {
            width: 200px;
            height: 200px;
            background: red;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%)
        }
```
* line-height和height text-align:center
```css
        .parent {
            height: 300px;
            border: 1px solid red;
            line-height: 300px;
            text-align: center;
        }

        .child {
            width: 200px;
            height: 200px;
            background: red;
            display: inline-block;
        }
```
* position:absolute;margin:auto,top:0;left:0;right:0;bottom:0;
```css
        .parent {
            height: 300px;
            border: 1px solid red;
            position: relative;
        }

        .child {
            width: 200px;
            height: 200px;
            background: red;
            position: absolute;
            top: 0;
            margin: auto;
            bottom: 0;
            left: 0;
            right: 0;
        }
```

##### css优化提高的方法
##### grid布局
##### flex布局
