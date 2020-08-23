# nodejs






### console
log,clear,count,time,timeEnd,error(会打印到 stderr 流。),trace,
chalk库用于美化控制台的输出信息
progress库用于进度条的显示
### http
### event 



### buff
申请内存空间
Buffer.alloc：申请指定大小的内存，并且清除原数据，默认填充 0
Buffer.allocUnsafe：申请指定大小内存，但不清除原数据，速度更快
要注意共享内存和拷贝内容,不然很容易出错
```javascript
const buf1 = Buffer.from("buffer");
const buf2 = Buffer.from(buf1); // 拷贝参数中buffer的数据到新的实例
buf1[0]++;

console.log(buf1.toString()); // output: cuffer
console.log(buf2.toString()); // output: buffer

const arr = new Uint8Array(1);
arr[0] = 97;

const buf1 = Buffer.from(arr.buffer);
console.log(buf1.toString()); // output: a

arr[0] = 98;
console.log(buf1.toString()); // output: b

```


### path
```javascript
const notes = '/users/joe/notes.txt'

path.dirname(notes) // /users/joe
path.basename(notes) // notes.txt
path.extname(notes) // .txt

path.resolve('joe.txt')// 获取文件的绝对路径
path.normalize('/users/joe/..//test.txt') ///users/test.txt  解析相对路径字符计算实际的路径
```


### file
fs.readFile() 和 fs.readFileSync() 都会在返回数据之前将文件的全部内容读取到内存中。
标志符
r+ 打开文件用于读写。
w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。


### buffrt模块

### stream



### 内存相关
##### 内存泄漏
1 变量挂载到全局上
2 闭包使用之后未清除闭包返回的函数引用
3 时间监听(Node.js 中 Agent 的 keepAlive 为 true 时，可能造成的内存泄漏。当 Agent keepAlive 为 true 的时候，将会复用之前使用过的 socket，如果在 socket 上添加事件监听，忘记清除的话，因为 socket 的复用，将导致事件重复监听从而产生内存泄漏。)
4 被遗忘的定时器和回调函数
内存泄漏排查方法
1 正常重现的测试模拟即可发现
2 偶然的内存泄漏可以使用快照的方式。快照很耗CPU可以使用heapdump来保存内存快照



##### 垃圾回收
新生代采取空间换时间的方法每次将form中存活的对象移到to中然后清除from调换from 和to .多次存活则将从新生代中移动到老生带区域。老生带区域采取标记整理(整理是为了防止内存碎片)





### process
process.exit()，则任何当前等待中或运行中的请求都会被中止。 这不太友好。
```javascript
// SIGTERM 是告诉进程要正常终止的信号。它是从进程管理者（如 upstart 或 supervisord）等发出的信号
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('进程已终止')
  })
})

// 可以从程序内部另一个函数中发送此信号
process.kill(process.pid, 'SIGTERM')

// 从命令行接受参数 第一个为node的执行环境地址 第二个为执行的js文件 后续的为传入的参数
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

// 传给 process.nextTick() 的函数会在事件循环的当前迭代中（当前操作结束之后）被执行。 这意味着它会始终在 setTimeout 和 setImmediate 之前执行。
// 延迟 0 毫秒的 setTimeout() 回调与 setImmediate() 非常相似。 执行顺序取决于各种因素，但是它们都会在事件循环的下一个迭代中运行。
process.nextTick()

// 递归的setTimeout可以模拟setInterval.可能存在某次函数运行时间过长间隔时间会产生冲突
const myFunction = () => {
  // 做些事情

  setTimeout(myFunction, 1000)
}

setTimeout(myFunction, 1000)

```
因为Node运行在V8引擎上，我们的JavaScript 将会运行在单个进程的单个线程上。它带来的好处是: 程序状态是单一的，在没有多线程的情况 下没有锁、线程同步问题，操作系统在调度时也因为较少上下文的切换，可以很好地提高CPU的使用率
从严格的意义上而言，Node并非真正的单线程架构,Node自身还有 一定的I/O线程存在，这些I/O线程由底层libuv处理，这部分线程对于JavaScript开发者而言是透明 的，只在C++扩展开发时才会关注到

###### 进程和线程的区别
进程是操作系统分配资源的最小单元
多线程相对多进程的优点
创建和销毁线程相对进程来说开销小很多，(并且线程之间可以共享数据 ，内存浪费的问题得
以解决）并且利用线程池可以减少创建和销毁线程的开销
多线程的缺点
1 每个线程都有自己独立的堆栈，每个堆栈都要占用一定的内存空间

多进程的缺点
1 每个线程都有自己独立的堆栈，每个堆栈都要占用一定的内存空间
2 无法共享内部状态（进程池的方式可以解决）
3 以及创建和销毁进程时候




### module
模块的查找路径




### nodejs与前端一些区别
1 模块化系统不一样nodejs 使用commonjs规范(exports require),浏览器使用es规范(export import)





### node模块