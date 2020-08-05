// series() parallel() 允许多个独立的任务组合为一个更大的操作.可以互相嵌套至任意深度
// src      用于获取目录文件的数据流
// dest     用于数据流导出的新的目录地址
const { series,parallel,src,dest,watch} = require('gulp');
const gulp = require('gulp');
const { EventEmitter } = require('events');
const { exec } = require('child_process');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require("del")
// 快速的加载插件 plugins.del  等同于require(del)
const plugins = require("gulp-load-plugins")()


// 使用browser-sync快读搭建热更新的html
const browserSync = require('browser-sync').create();


// `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// 它仍然可以被用在 `series()` 组合中。
function clean(cb) {
  // body omitted
  console.log("clean output")
  del("./output")
  cb();
}

// 数据流形式的任务
function streamTask(){
    // 是以gulpfile.js文件夹或者文件所在的目录为相对目录.可以再中间插入流一起执行后面的过程.
    // rename 用于更改文件代码名称
    // src的模式有三种
    //  1 缓冲 即将文件读取到内存(插件通常运行在缓冲模式下)
    //  2 流动 针对大型文件无法读取到内存之中
    //  3 空   模式不包含任何内容尽在处理文件元数据有用
    return src(["./src/index.js"])
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({extname:".min.js"}))
        .pipe(dest("dist/"))
}

function jsTask(){
  // 是以gulpfile.js文件夹或者文件所在的目录为相对目录.可以再中间插入流一起执行后面的过程.
    // rename 用于更改文件代码名称
    // src的模式有三种
    //  1 缓冲 即将文件读取到内存(插件通常运行在缓冲模式下)
    //  2 流动 针对大型文件无法读取到内存之中
    //  3 空   模式不包含任何内容尽在处理文件元数据有用
    return src(["./src/module_a.js","./src/index.js"])
        .pipe(babel())
        .pipe(dest("dist"))
        .pipe(browserSync.reload({stream:true}))
}

function cssTask(){
    return src(["./src/css/*.scss"])
        .pipe(plugins.sass({outputStyle:"compressed"}))
        .pipe(plugins.autoprefixer({
            cascade:false,
            remove :false
        }))
        .pipe(dest("dist"))
        .pipe(browserSync.reload({stream:true}))
}

// Promise形式的task
function promiseTask() {
    return Promise.resolve('the value is ignored');
}

// 事件形式的任务
function eventEmitterTask() {
    const emitter = new EventEmitter();
    // 延迟触发任务
    setTimeout(()=>emitter.emit('finish'),250);
    return emitter;
}

// 子线程形式的任务
function childProcessTask(){
    return exec('date');
}

// observable管擦这形式ID任.利用rxjs库的Observable
// function observableTask() {
//     return Observable.of(1, 2, 3);
// }

// cb形式的任务
function callbackTask(cb){
    // 执行回调表示任务已经执行完毕,回调后续的代码仍会执行.可以将错误通过cb(error)向gulp传递
    cb()
}

// `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// 它也仍然可以被用在 `series()` 组合中。
function build(cb) {
  // body omitted
  console.log("build")
  cb();
  
}

// server任务
function serverTask(cb){
    // 初始化一个服务器
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    cb()
}

function watcherTask(cb){
    // 监听文件,当文件发生变化时执行任务
    watch('./src/css/*.scss', series( cssTask));
    watch('./src/*.js', series(jsTask));
    cb()
}

//先处理一次js css的任务然后启动一个服务,再运行watcherTask对文件的变化进行监听
const buildTask = series(jsTask,cssTask,serverTask,watcherTask)
const seriesTask = series(streamTask,promiseTask,callbackTask,eventEmitterTask,childProcessTask);
const parallelTask = parallel(build);

exports.default = series(clean,buildTask);
// exports.default = series(clean,buildTask,parallelTask, seriesTask);
