# css



### 常见定位方案
* 普通流
* 浮动
* 绝对定位

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
* display:inline-block;使用height = line-height 垂直居中
* 绝对定位 top:50% left:50% ;使用transform进行自身的移动垂直居中
* flex和grid布局


##### css优化提高的方法
##### grid布局
##### flex布局
