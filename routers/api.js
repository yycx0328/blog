/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var User = require('../models/User');
var router = express.Router();
var jsonResult;

router.use(function (req,res,next) {
    jsonResult = {
        code:0,
        message:''
    };
    next();
});

router.post('/user/login',function (req,res,next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo) {
        if(!userInfo){
            jsonResult.code = 1;
            jsonResult.message = '用户名或密码不正确';
            res.json(jsonResult);
            return;
        }

        jsonResult.message='登录成功';
        jsonResult.userInfo = {
            _id : userInfo._id,
            username : userInfo.username
        };
        req.cookies.set('userInfo',JSON.stringify({
            _id : userInfo._id,
            username : userInfo.username
        }));
        res.json(jsonResult);
    });
});

router.post('/user/register',function (req, res,next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    // 用户名是否为空
    if(username == ''){
        jsonResult.code = 1;
        jsonResult.message = '用户名不能为空';
        res.json(jsonResult);
        return;
    }

    // 密码是否为空
    if(password == ''){
        jsonResult.code = 2;
        jsonResult.message = '密码不能为空';
        res.json(jsonResult);
        return;
    }

    // 密码是否一致
    if(password != repassword){
        jsonResult.code = 3;
        jsonResult.message = '密码不一致';
        res.json(jsonResult);
        return;
    }

    // 注册用户，先查找验证用户名是否存在，存在则返回注册失败，否则注册新用户
    User.findOne({
        username:username
    }).then(function (userInfo) {
        // 用户名已经注册
        if(userInfo){
            jsonResult.code=4;
            jsonResult.message='用户名已经被注册';
            res.json(jsonResult);
            return;
        }

        // 否则保存注册用户
        var user = new User({
            username:username,
            password:password
        });
        return user.save();
    }).then(function (newUserInfo) {
        jsonResult.message='注册成功';
        jsonResult.userInfo = {
            _id:newUserInfo._id,
            username:newUserInfo.username
        };
        res.json(jsonResult);
    });
});

router.get('/logout',function (req,res,next) {
    req.cookies.set('userInfo',null);
    res.json(jsonResult);
});

module.exports = router;