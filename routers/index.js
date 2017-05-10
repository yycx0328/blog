/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var router = express.Router();
var Category = require('../models/Categories');
var jsonResult = {
    code:-1,
    message:'初始化异常'
};

router.get('/',function (req, res,next) {
    Category.find({},function (err,categories) {
        res.render('index',{
            userInfo:req.userInfo,
            categories : categories
        });
    });
});

router.post('/category_index',function (req,res,next) {
    console.log(req.body);
    var categoryid = req.body.categoryid;
    var categoryname = req.body.categoryname;
    res.render('category_index',{categoryid:categoryid,categoryname:categoryname});
});

module.exports = router;