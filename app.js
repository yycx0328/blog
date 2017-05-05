/**
 * Created by luyh on 2017/5/5.
 */
// 加载express模块
var express = require('express');
// 加载swig模板
var swig = require('swig');
// 加载path模块
var path = require('path');
// 加载服务器配置
var svr = require('./config/server');
// 创建服务应用
var app = express();

// 设置页面不缓存，以方便调试
swig.setDefaults({cache:false});
app.engine('html',swig.renderFile);
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');

// 路由配置分三块：用户页面路由、管理后台路由、api接口路由
app.use('/',require('./routers/index'))
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));

// 启动服务并监听端口
app.listen(svr.port,svr.host,function (err) {
    if(err){
        console.log('服务启动失败：'+err);
    }
    console.log('服务已启动，正在监听%s:%s端口...',svr.host,svr.port);
});