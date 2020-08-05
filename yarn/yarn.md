#yarn

### 简介
Yarn 是为了弥补 npm 的一些缺陷而出现的。
优点
* 并行安装,npm是按照队列执行每个package进行安装的。yarn采取的是同步执行所以任务.
* 离线模式,已经安装过的包会从缓存中去取.
* 安装版本统一.
* 更简洁的输出,npm输出信心过多导致信息丢失.
* 更好的语义化,yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰.

### 命令
yarn init           
yarn install / yarn         安装全部依赖
yarn global lodash          全局安装依赖包
yarn add lodash             安装包
yarn add lodash --dev       安装开发依赖包
yarn remove lodash          移除包
yarn upgrade                升级所有依赖
yarn run dev                运行scripts脚本
yarn info                   显示摸个包的信息
yarn list                   列出项目的依赖
yarn config list            显示配置信息
yarn config set key value   设置配置
yarn config get key         获取配置值
yarn config delete key      删除某个配置值
yarn cache list             显示缓存的包
yarn cache dir              显示缓存的目录地址
yarn cache clean            清除缓存中的包
yarn link                   将包连接到全局
yarn link yarn-link-test    将yarn-link-text(即本地link到全局的包)引用到本项目
yarn unlink                 与全局的包解除连接
yarn pack                   给报的依赖打包
    yarn publish list login logout outdated 等行为与npm一致
### 语法
### 缺点