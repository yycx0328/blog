博客发布地址：http://www.isofteam.com

github源码地址：http://github.com/yycx0328/blog.git

最近学习了一下nodejs，便尝试着搭建了一下自己的个人技术博客，以便给大家分享一下自己的开发心得和技巧。

一、项目说明： 本项目使用express+mongodb+swig搭建。 swig是一个可在客户端也可在服务端使用的模板引擎，语法简单、易用。

1、在Windows下启动mongod服务： 命令提示符窗口下进入到mongodb安装目录的bin目录下输入：
> mongod --dbpath=E:\git\blog\db --port=27017 （dbpath：是你存放项目db文件的路径，port：是mongod服务端口号）

2、Mac或Unbuntu下启动mongodb服务： 进入到mongodb的bin目录下：
> cd /usr/local/mongodb/bin/
在bin目录下创建mongodb.conf文件：
> vim mongodb.conf
输入以下内容：
port=27017
dbpath=/usr/local/mongodb/data/
logpath=/usr/local/mongodb/log/mongodb.log
fork = true
启动mongodb:
> ./mongod -f mongodb.conf

启动mongodb服务后，从github上download源码直接运行就可以完美的跑起来：
git clone https://github.com/yycx0328/blog.git 安装依赖： npm install 运行项目： node app.js

二、系统说明：
1、本项目区分普通用户和管理员；
2、普通用户前端页面采用的是纯css+js设计，没有用别的特殊前端框架；
3、管理员有一个相应的管理后台，采用的是bootstrap前端web框架，写的比较素，因为主要是用于自己管理用户、博文分类、博文，
因为毕竟是个人技术博客，没有做成社区论坛形式，博文只能由管理员自己添加；
4、注册的用户都是普通用户，第一个管理员需要手动更新用户isAdmin属性为true，以后就可以直接管理员登陆后台操作。

三、Nginx反向代理部署项目
扩展一点内容，利用Nginx反向代理不是该项目，首先我自己有一台云服务器和一个域名，现在我想在服务器上部署我的nodejs项目。
我的做法是这样的：
1、将你的域名解析到你的服务器，如我用的域名是www.isofteam.com，服务器地址是115.159.197.117；
2、在你的服务器上安装Nginx，进入到安装目录下的conf目录下的nginx.conf配置文件添加：
server {
     # 端口号
     listen 80;
     # 你自己的域名
     server_name isofteam.com,www.isofteam.com;
     # 访问日志
     #access_log logs/isofteam.access.log main;
     # 错误日志
     #error_log logs/isofteam.error.log; root html; index index.html index.htm;
     location / {
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header   Host             $http_host;
        proxy_set_header   X-Nginx-Proxy    true;
        proxy_set_header   Connection       "";
        proxy_pass  http://127.0.0.1:3000;
     }
}   

这样配置的意义在于，保证开发和发布服务器的代码一模一样，每次发布不需要更改任何代码文件。
3、启动Nginx：
> start nginx
ok，这样Nginx就配置完成了，只需要在服务器上运行：
> node app.js
项目就能正常启动了，当你通过www.isofteam.com，访问博客主页时，其实是反向到服务器的3000端口，并响应。