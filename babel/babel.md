# babel

### 简介
  Babel 是一个 JavaScript 的编译器。你可能知道 Babel 可以将最新版的 ES 语法转为 ES5，不过不只如此，它还可用于语法检查，编译，代码高亮，代码转换，优化，压缩等场景。

### 配置
  babel是构建在插件之上的@babel/core属于核心流程库,再搭配各种语法插件完成代码的转译。
  babel配置方式(插件的配置中plugin-可以省略)
  1 .babelrc放在根目录作为babel的配置项.
```javascript
{
    // "presets":["@babel/env"]
    "presets":["@babel/preset-env"]
}
```
  2 babel.config.json放在根目录作为babel的配置项
```javascript
{
    "presets":["@babel/preset-env"]
}
```
  3 babel.config.js  导出函数的形式,函数返回配置文件
```javascript
module.exports =function(api){
    api.cache(true);
    return {
        "presets":[
            [
                "@babel/preset-env",
                {
                    "targets":{},
                    "useBuiltIns":"usage"
                }
            ]
        ]
    }
}
```
  4 package.json中的babel字段进行配置
```javascript
{
  {
    "name": "my-package",
    "version": "1.0.0",
    "babel": {
        "presets": [ ... ],
        "plugins": [ ... ],
    }
  }
}
```
  5 将babel作为工具库,通过babel的api进行处理
```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-arrow-functions"]
});
```
  6 基于环境配置babel
  当前环境可以使用 process.env.BABEL_ENV 来获得。 如果 BABEL_ENV 不可用，将会替换成 NODE_ENV，并且如果后者也没有设置，那么缺省值是"development"。
```javascript
{
    "presets": ["es2015"],
    "plugins": [],
    "env": {
        "development": {
            "plugins": [...]
        },
        "production": {
    	    "plugins": [...]
        }
    }
}
```
    
### 核心库工具
    @babel/core                     核心的流程库
    @babel/cli                      babel指令包
    @babel/preset-env               es6核心语法插件集合
    @babel/polyfill                 es6语法垫片库,类似Promise等无法通过语法转换成es5形式的语法库
    core-js@2/core-js@3             当未使用垫片库的时候需要安装才可以使用promise等语法
    @babel/runtime                  提供编译模块的工具函数
    @babel/plugin-transform-runtime 利用 plugin 自动识别并替换代码中的新特性，你不需要再引入.实现多次引用相同 API 只加载一次。
    @babel/traverse
    @babel/preset-flow              flow语法的支持
    @babel/preset-react             react语法的支持
    @babel/preset-typescript        typescript语法的支持
    @babel/register                 @babel/register 模块改写 require 命令，为它加上一个钩子。此后，每当使用 require 加载 .js、.jsx、.es 和 .es6 后缀名的文件，就会先用 Babel 进行转码。默认会忽略 node_modules 

babel的核心模块
    @babel/parser                   解析代码返回一个AST抽象语法树
    @babel/generator                由AST抽象语法树生成代码
    @babel/code-frame               控制台输出编译代码的错误行信息
    @babel/helpers                  Babel 转换的帮助函数集合
    @babel/template                 能让你编写字符串形式且带有占位符的代码来代替手动编码
    @babel/traverse                 遍历AST抽象语法树然后进行操作    
    @babel/types                    为AST节点提供的lodash类的实用程序库

##### 自定义preset集合
可以创建自己的preset集合,只需要导出已分配至文件即可.同时可以嵌套的包含其它preset及插件。
```javascript
module.exports = function() {
  return {
    presets: [
     require("@babel/preset-env"),
    ],
    plugins: [
      "pluginA",
       require("@babel/preset-env"),
      "pluginC",
    ]
  };
}
```
路径问题
```javascript
{
//   "presets": ["babel-preset-myPreset"] //作为npm包的使用
  "presets": ["./myProject/myPreset"] //使用绝对路径
}
```

### 原理
babel转译分为三个阶段
* 解析  将代码解析为AST抽象语法树
* 转换  利用插件以及一些工具方法遍历整个AST抽象语法树对相关节点内容进行转换处理。
* 代码生成  根据新的AST抽象语法树生成代码

[ast抽象语法树解析工具](https://astexplorer.net/)



### babel插件
  presets插件中执行的顺序是从后往前一直执行.插件的参数是数组嵌套
```javascript
{
  "plugins": ["pluginA", ["pluginA"], ["pluginA", {}]] //三种方式均一样的效果
}
```

##### 插件的编写 
  关于访问者模式
  总结下就是有元素类和访问者两种类型，元素类有 accept 方法接受一个访问者对象并调用其访问方法，访问者提供访问方法，接受元素类提供的参数并进行操作。
  写 Babel 插件就是定义一个访问者，每次进入一个节点的时候，我们是在访问一个节点。对于 AST，@babel/traverse 对其进行先序遍历，每个节点都会被访问两次，可以通过 enter 和 exit 方法对两次访问节点进行操作。visitor中针对不同类型的表达式坐不同的处理.如果忽略当前节点的所有子孙节点，可以使用 path.skip() 如果想要结束遍历，可以使用 path.stop() 。
  可以通过AST抽象语法树前后的对比找出差异点然后进行编码。

```javascript
module.exports = function({ types: t }) {
  return {
    visitor: {
      // 将a===b处理为sebmck ==== dork
      BinaryExpression(path) { //二进制表达式
        if (path.node.operator !== "===") {
          return;
        }
        path.node.left = t.identifier("sebmck");
        path.node.right = t.identifier("dork");
      }
    }
  };
}
```

import { Button } from 'antd' 处理为 import Button from 'antd/lib/button'; 
```javascript
module.exports = function ({
    types: t
}) {
    return {
        visitor: {
            // import { Button } from 'antd' 处理为 import Button from 'antd/lib/button';  这样可以做到按需加载
            ImportDeclaration(path) { //import 表达式
                let {
                    specifiers,
                    source
                } = path.node;
                if (source.value === 'antd') {
                    // 如果库引入的是 'antd' 
                    if (!t.isImportDefaultSpecifier(specifiers[0]) // 判断不是默认导入 import Default from 'antd';           
                        &&
                        !t.isImportNamespaceSpecifier(specifiers[0])) { // 也不是全部导入 import * as antd from 'antd';      
                        let declarations = specifiers.map(specifier => {
                            let componentName = specifier.imported.name; // 引入的组件名              
                            // 新生成的引入是默认引入             
                            return t.ImportDeclaration([t.ImportDefaultSpecifier(specifier.local)], // 转换后的引入要与之前保持相同的名字 
                                t.StringLiteral('antd/lib/' + componentName.toLowerCase()) // 修改引入库的名字      
                            );
                        }); // 用转换后的语句替换之前的声明语句     
                        path.replaceWithMultiple(declarations);
                    }
                }
            }
        }
    }
}
```