/**
 * Created by luyh on 2017/5/5.
 */

var express = require('express');
var server = require('./config/server');
var app = express();

app.listen(server.port,server.host,function (err) {
    if(err){
        console.log('服务启动失败：'+err);
    }
    console.log('服务已启动，正在监听%s:%s端口...',server.host,server.port);
});