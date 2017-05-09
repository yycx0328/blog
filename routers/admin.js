/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var router = express.Router();
var jsonResult = {
    code:-1000,
    message:'初始化异常'
};

router.use(function (req,res,next) {
    if(req.userInfo){
        jsonResult.userInfo = req.userInfo;
        next();
    }
    else{
        res.render('index');
    }
});

router.get('/',function (req, res,next) {
    res.render('admin/index',jsonResult);
});

router.get('/profile',function (req,res,next) {
    res.render('admin/profile',jsonResult);
});

router.get('/users',function (req,res,next) {
    res.render('admin/users',jsonResult);
});

router.get('/categories',function (req,res,next) {
    res.render('admin/categories',jsonResult);
});

module.exports = router;