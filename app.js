/**
 * Created by luyh on 2017/5/5.
 */
// 加载express模块
var express = require('express');
// 加载swig模板
var swig = require('swig');
// 加载util
var util = require('util');
// 加载body-parser模块
var bodyParser = require('body-parser');
// 加载cookies模块
var Cookies = require('cookies');
// 加载path模块
var path = require('path');
// 加载mogoose模块
var mongoose = require('mongoose');
// 加载db配置
var db = require('./config/db');
// 加载服务器配置
var svr = require('./config/server');
// 创建服务应用
var app = express();

app.use('/public',express.static(path.join(__dirname,'public')));
// 设置页面不缓存，以方便调试
swig.setDefaults({cache:false});
app.set('view engine','html');
app.set('views','./views');
// bodyParser设置
app.use(bodyParser.urlencoded({extended:true}));
// 定义模板引擎
app.engine('html',swig.renderFile);
// 设置cookies
app.use(function (req,res,next) {
    req.cookies = new Cookies(req,res);
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        }catch (e){
            console.log(e);
        }
    }
    next();
});

// 路由配置分三块：用户页面路由、管理后台路由、api接口路由
app.use('/',require('./routers/index'));
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));

// 连接数据库
mongoose.connect(util.format('mongodb://%s:%s/%s',db.host,db.port,db.database),function (err) {
// mongoose.connect('mongodb://vanluu:123456@ds143241.mlab.com:43241/van-blog',function (err) {
   if(err){
       console.log(err);
       console.log('连接数据库失败！');
   }
    else{
       console.log('连接数据库成功！');
       // 启动服务并监听端口
       // app.listen(43241);
       app.listen(svr.port,svr.host,function (err) {
           if(err){
               console.log('服务启动失败：'+err);
           }
           console.log('服务已启动，正在监听%s:%s端口...',svr.host,svr.port);
       });
   }
});