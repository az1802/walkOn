http1.1
1 增加了缓存处理。http1.0中以If-Modified-Since,Expires。http1.1引入了更多的缓存控制策略Entity tag，If-Unmodified-Since, If-Match, If-None-Match
2 带宽优化及网络连接的使用。HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
3 Host头处理
4 长连接 在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟

http1.1的缺陷
1 高延迟-对头阻塞 请求序列中的一个请求因为某种原因被阻塞时，在后面排队的所有请求也一并被阻塞，会导致客户端迟迟收不到数据。
2 无状态特性 连接状态没有记忆能力。纯净的 HTTP 是没有 cookie 等机制的
3 明文传输
4 不支持服务器推送

http2 
1 多路复用
2 头部压缩
3 请求优先级
4 服务端推送
5 提高安全性

https与http区别
1 HTTPS协议需要到CA申请证书，一般免费证书很少，需要交费
2 HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。
3 HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4 HTTPS可以有效的防止运营商劫持，解决了防劫持的一个大问题。
