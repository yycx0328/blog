/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var router = express.Router();
var jsonResult = {
    code:-1000,
    message:'初始化异常',
    data:null
};

router.get('/users',function (req, res,next) {
    res.send('这是用户列表');
});

module.exports = router;