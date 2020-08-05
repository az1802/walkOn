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