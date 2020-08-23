import { createApp, h } from 'vue'
import App from './App.vue'
import './index.css'


console.log(h);
const app = createApp(App);
console.log(app);
// app.config = {
//     devtools: true,//开发者工具
//     errorHandler(err, vm, info) {//自定义错误处理
//         console.log("errorHandler -> err, vm, info", err, vm, info)
//     },
//     warnHandler(err, vm, info) {//自定义警告信息处理
//         console.log("warnHandler -> err, vm, info", err, vm, info)
//     },
//     globalProperties: {//配置组件实例的全局属性
//         global: "全局属性"
//     },
//     isCustomElement: (tag) => {  //是否是自定义的元素

//     },
//     optionMergeStrategies() {  //自定义某个options参数的合并策略

//     },
//     performance: false //开启性能标记,组件的create render patch都将存在时间的记录
// }


// 注册自定义指令
app.directive('focus', {
    // When the bound element is mounted into the DOM...
    beforeMount() {
        console.log("指令绑定之前");
    },
    // mounted(el) {
    //     console.log("指令绑定");
    //     el.focus()
    // },
    inserted(el) {
        console.log("指令插入");
        el.focus()
    },
    beforeUpdate() {
        console.log("指令更新之前");
    },
    updated() {
        console.log("指令更新之后");
    },
    beforeUnmount() {
        console.log("指令解绑之前");
    },
    unmounted() {
        console.log("指令解绑之后");
    }
})

app.mount('#app')
