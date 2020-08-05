# npm

### 简介
  npm是一个成熟、稳定、并且有趣的包管理工具。
### 命令相关
npm install npm@latest -g   npm包安装
npm -v                      查看npm版本号
npm -h                      查看帮助选项
npm info lodash             查看包信息
npm search lodash           搜索lodash关键字相关的包
npm view lodash             查看一个包的信息
npm init -y                 快捷的初始化package.json文件
npm run start               运行package.json scripts中声明的指令脚本
npm ls -g                   查看全局安装的模块及依赖
npm ls                      查看项目文件下安装的模块及依赖
npm root  / npm root -g     查看包的安装目录
npm cache clean             清理缓存
npm outdated                检查包是否过时
npm link                    将本地正在开发的包link到全局,这样本地项目可以使用npm i 进行安装然后使用此包.
npm bin                     node模块可执行脚本所在的目录即.bin目录
npm adduser                 添加用户
npm whoami                  查看当前用户
npm publish                 发布包
npm config                  npm配置相关信息
npm unpublish               删除包,用户后续不能再安装此包建议使用deprecate废弃包
npm deprecate               废弃包会像安装用户发出警告
npm set                     设置环境变量后续npm init -y会自动添加进去
npm config ls -l            显示npm全部的配置信息

    设置包的镜像地址 用于提速 npm config set registry https://registry.npm.taobao.org npm info underscore。
    可以使用nrm管理镜像地址方便切换.
    1注册 npm install -g nrm 
    2添加 nrm add npm http://registry.npmjs.org/nrm add taobao https://registry.npm.taobao.org
    3 切换 nrm use taobao/nrm use npm

###### 安装相关的指令
npm i -g                    全局安装包
npm i -D                    安装包仅为开发环境中使用
npm i -S                    安装包在生成环境中使用
npm i lodash@least -S       安装最新的lodash包版本
npm update lodash           更新包
npm uninstall lodash -g     卸载全局模块
npm remove lodash           移除包
npm i lodash@"\>=1.1 < 3.3" 控制安装版本的范围







##### scripts脚本
  通过npm run 来运行一些脚本。npm run 为每条命令提供了pre- post-两个钩子会先查找是否存在相关指令,有则执行. 1 npm run pretest 2 npm run test 3 npm tun posttest



### packjson各个字段说明
package.json 是 CommonJS 规定的用来描述包的文件，完全符合规范的 package.json 文件应该含有以下字段：
name: 包的名字，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格。
description: 包的简要说明。
version: 符合语义化版本识别规范的版本字符串。
keywords: 关键字数组，通常用于搜索。
maintainers: 维护者数组，每个元素要包含 name
、email(可选)、web(可选)字段。
contributors: 贡献者数组，格式与 maintainers 相同。包的作者应该是贡献者数组的第一个元素。
bugs: 提交 bug 的地址，可以是网址或者电子邮件地址。
licenses: 许可证数组，每个元素要包含
type（许可证的名称）和 url（链接到许可证文本的地址）字段。
repositories: 仓库托管地址数组，每个元素要包含 type（仓库的类型，如 git）、URL（仓库的地址）和 path（相对于仓库的路径，可选）字段。
dependencies: 包的依赖，一个关联数组，由包名称和版本号组成。
peerDependencies:预装的依赖表明这个包需要依赖于哪些其他的包避免重复安装。
optionalDependencies:可选依赖就像插件一样存在即执行不存在即跳过不影响主题流程。
bundledDependencies:包含依赖包名的数组对象，在发布时会将这个对象中的包打包到最终的发布包里



### npm包版本号

标准版本号格式为： X.Y.Z , 有下面几点说明

* X.Y.Z  均为非负整数，X: 主版本号、Y：此版本号、Z：修订号。每个元素依次递增
* 任何修改都要用新的版本号发布当 X 为 0 时（0.y.z），此时属于开发初期，任务公共API 都可能改变，属于非稳定期。1.0.0 用于界定公共 API 的形成
* 修改 Z,   必须在做了向下兼容的修正时才递增，例如 修复 bug
* 修改 Y,   必须在有向下兼容的新功能时才递增，当 Y 修改后，Z 必须归 0
* 修改 X,   必须在有任何不兼容的修改被加入公共 API 时递增，当 X 修改后， Y, Z 必须归  0
  
##### 预发版本号
* alpha(α)：预览版，或者叫内部测试版
* beta(β)：测试版，或者叫公开测试版
* rc(release candidate)：最终测试版本
  
##### 版本号优先级
版本优先级也就是指版本的高低

* 首先记住 2.1.0-beta 的优先级低于 2.1.0 ，先有预发，再有稳定；
* 对于正常版本格式 X.Y.Z ，都是数值，比较每一位大小就OK；
* 而对于预发版本，有数字比数值大小，非数字比较每个字符的 ASCII 大小；

    所以： 1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0

##### 版本号的范围
* \>,>=,<=,<= 次版本号确实为0
* \* 匹配任意版本，也就是 >= 0.0.0.1.2.x ，匹配的版本 X.Y 两位不变，所以版本范围是 >=1.2.0 < 1.3.0.  1.x ，匹配的版本 X 位不变，所以版本范围是 >=1.0.0 < 2.0.0
* ~如果Y被指定，则允许Z被改变；如果没有，允许Y被改变 
  * ~1.2.3 , Y 被指定为 2, 那么匹配的范围为 >=1.2.3 <1.3.0
  * ~1.2, Y 被指定为 2, 那么匹配的范围为 >=1.2.0 <1.3.0
  * ~1, 没有指定 Y, 那么 Y 可以被改变，匹配的范围为 >1.0.0 <2.0.0
* ^匹配的版本，会保证最左边的第一个非 0 位不修改
  * ^1.2.3, 最左边非 0 位为 X 位，所以匹配的范围为 >=1.2.3 <2.0.0
  * ^0.2.3, 最左边非 0 位为 Y 位，所以匹配的范围为 >=0.2.3 <0.3.0
  * ^1.2.x , 当版本缺失，缺失位会降到 0 ，所以匹配的范围位 >=1.2.0 <2.0.0


### 工作原理
  npm5增加了package-lock.json文件锁定依赖的版本,确保任何环节运行npm install 得到相同的node_modules接口。(禁用命令 npm config set package-lock false)