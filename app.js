/**
 * Created by luyh on 2017/5/5.
 */

var express = require('express');
var swig = require('swig');
var path = require('path');
var server = require('./config/server');
var app = express();

swig.setDefaults({cache:false});
app.engine('html',swig.renderFile);
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');

app.use('/',require('./routers/index'))
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));

app.listen(server.port,server.host,function (err) {
    if(err){
        console.log('服务启动失败：'+err);
    }
    console.log('服务已启动，正在监听%s:%s端口...',server.host,server.port);
});