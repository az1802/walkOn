# Vue




### vue-cli
#### 安装
yarn global add @vue/cli
npm install -g @vue/cli-service-global     可以使用vue serve   vue build(单个文件的打包)
vue --version  //查看版本
vue create hello-vue   创建新项目
npm run serve  启动服务

使用mapState将store数据转换为子组件的计算属性
```javascript
//从this.$store中提取数据,可以使用computed进行再次的封装这样可以直接当本自身组件的属性去使用,不用使用this.$store.count这种形式.
//mapState可以进行批量的store数据转换,直接函数形式
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  }),
//   computed: mapState([
//     // 映射 this.count 为 store.state.count
//    'count'
//   ])
}

```

vuex中getter类似于计算属性基于计算属性,mapGetters使用与mapState类似
```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {//第二个参数getters可以访问另一个属性
    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    }
  }
})

// mapGetters使用方式与mapState类似
export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

mutation,不能直接调用mutation里面生成方法。需要使用$store.commit(increment,10,10)的方法进行触发调用,可以再提交duoge 参数给mutation方法使用.
mapMutations可以将多个mutation映射到组件的methods中直接进行调用.
mutation内部不能使用异步函数更改数据。因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。异步任务我们使用action进行数据更改

#在组件中提交 Mutation
```javascript
// 触发mutation的方式有多种
store.commit('increment', {
  amount: 10
})

// 传入一个对象使用type声明触发的行为函数名称
store.commit({
  type: 'increment',
  amount: 10
})
```

action类似于mutation,通过过提交mutation更改状态而不是直接更改state.可以进行异步操作.这样做了一种隔离层,各个功能独一便于调试.
```javascript
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

// action中方法中返回Promise对象,利用async promise的some all 可以实现对不同action的组合

```

### vue-Router

##### 路由配置
```javascript
// 函数路由
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
//跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。
router.replace()
// 这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。
router.go()

const router = new VueRouter({
  routes: [
    {
      path: '/', //路由的路径匹配,
      name:"home",//使用name进行导航
      alias:"main",//路由别名
      params:{//路由参数可以是编程路由或者url中带入
          id:"123",
      },
      components: {
        default: Foo, //可以通过不同的router-view  name=“a” 来显示多个同级的组件
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

##### 完整的导航解析的流程
1 导航被触发。
2 在失活的组件里调用 beforeRouteLeave 守卫。
3 调用全局的 beforeEach 守卫。
4 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5 在路由配置里调用 beforeEnter。
6 解析异步路由组件。
7 在被激活的组件里调用 beforeRouteEnter。
8 调用全局的 beforeResolve 守卫 (2.5+)。
9 导航被确认。
10 调用全局的 afterEach 钩子。
11 触发 DOM 更新。
12 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入

##### history模式与hash模式区别
hash模式使用监听 hashchange来进行视图的更新 所有信息存在于url路径中带#号(a标签的锚点导航会受到影响) 
history模式   URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。


### vite
