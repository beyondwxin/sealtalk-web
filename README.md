# 融云 RongCloud Web IM V2.0

## Environment Setup

### 初始化开发工具--

```
npm install -g typescript@1.6.0beta tsd coffee-script grunt-cli karma-cli
```

如有必要，使用 `sudo npm`

### 安装依赖库

在项目根目录下执行：

```
npm install
bower install
tsd install
```

### 编译开发代码

```
grunt build
```

### 发布正式代码

```
grunt release
```

### 启动本地服务器

```
grunt connect
```

### 在浏览器中打开

[http://localhost:8181](http://localhost:8181)  
执行 grunt build 前将 app.config 文件中的 serverUrl 和 appkey 改为自己应用的值
SDK 使用高版本 typescript 语法写的可能编译不过，请打开 node_modules/grunt-typescript/package.json 文件，将 typescript 版本改为 1.6.2， 然后在 grunt-typescript 执行一下 npm install

### Mac 环境下开发

Mac 环境下开发需修改 typings 目录的访问权限，否则执行 grunt build 会报错

## Coding Guidelines

https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines


## 站点部署说明

```
1.修改 /src/assets/app.config 中 serverUrl 和 appkey 的值（ ServerUrl 为后台 Server 地址，AppKey 为从融云注册的应用 key）
2.项目根目录执行命令 grunt release
3.将 dist 目录下的文件以静态文件形式部署在服务器上。程序入口页面 index.html。
4.本代码不能直接运行,需要结合后台 Sever 一起使用。Server 源码参考 https://github.com/sealtalk/sealtalk-server
```
