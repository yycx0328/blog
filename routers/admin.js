/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var Category = require('../models/Categories');
var router = express.Router();
var jsonResult = {
    code:0,
    message:''
};

router.use(function (req,res,next) {
    if(req.userInfo){
        jsonResult.userInfo = req.userInfo;
    }
    else{
        res.render('index');
    }
    next();
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

// 获取分类列表
router.get('/categories',function (req,res,next) {
    Category.find({},function (err,categories) {
        console.log(categories);
        // 查询时发生异常
        if(err){
            jsonResult.message = '异常';
            res.json(jsonResult);
            return;
        }
        // 查询成功
        if(categories){
            jsonResult.message='成功';
            jsonResult.categories = categories;
        }
        else{
            jsonResult.message = '无显示结果';
        }
        res.render('admin/categories',jsonResult);
    });
});

router.get('/category/add',function (req,res,next) {
    res.render('admin/category_add');
})

// 添加分类
router.post('/category/add',function (req,res,next) {
    var categoryname = req.body.categoryname;
    if(categoryname == ''){
        jsonResult.code = 1;
        jsonResult.message = '类别名称不能为空';
        res.json(jsonResult);
        return;
    }

    if(categoryname.length>32){
        jsonResult.code = 2;
        jsonResult.message = '类别名称长度不能超过32个字符';
        res.json(jsonResult);
        return;
    }

    Category.findOne({
        categoryname:categoryname
    }).then(function (categoryInfo) {
        if(categoryInfo){
            jsonResult.code = 3;
            jsonResult.message='类别名称已存在';
            res.json(jsonResult);
            return;
        }

        var category = new Category({
            categoryname:categoryname
        });

        return category.save();
    }).then(function (newCateogryInfo) {
        jsonResult.message = '添加成功';
        res.json(jsonResult);
    });
});

module.exports = router;