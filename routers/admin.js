/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var Category = require('../models/Categories');
var router = express.Router();
var jsonResult = {
    code:-1,
    message:'初始化异常'
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
        // 查询时发生异常
        if(err){
            jsonResult.message = '异常';
            res.json(jsonResult);
            return;
        }
        // 查询成功
        if(categories){
            jsonResult.code = 0;
            jsonResult.message='成功';
            jsonResult.categories = categories;
        }
        else{
            jsonResult.message = '无显示结果';
        }
        res.render('admin/categories',jsonResult);
    });
});

// 添加分类渲染页
router.get('/category/add',function (req,res,next) {
    res.render('admin/category_add');
});

// 添加分类操作
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
        jsonResult.code = 0;
        jsonResult.message = '添加成功';
        res.json(jsonResult);
    });
});

// 修改分类渲染页
router.get('/category/update',function (req,res,next) {
    var categoryid = req.query.categoryid;
    var categoryname = req.query.categoryname;
    res.render('admin/category_update',{
        categoryid:categoryid,
        categoryname:categoryname
    });
});

// 修改分类操作
router.post('/category/update',function (req,res,next) {
    var categoryid = req.body.categoryid;
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


    Category.findById(categoryid,function(err,categoryInfo){
        categoryInfo.categoryname = categoryname;
        var _id = categoryInfo._id; //需要取出主键_id
        delete categoryInfo._id;    //再将其删除
        Category.update({_id:_id},categoryInfo,function(err){
            if(err){
                jsonResult.code = 3;
                if(err.code=='11000')
                    jsonResult.message='类别名称已存在';
                else
                    jsonResult.message ='修改失败';
                res.json(jsonResult);
                return;
            }
            jsonResult.code = 0;
            jsonResult.message ='修改成功';
            res.json(jsonResult);
        });
    });
});

// 删除分类操作
router.post('/category/delete',function (req,res,next) {
    var categoryid = req.body.categoryid;
    Category.remove({_id:categoryid},function(err,result){
        if(err){
            console.log(err);
            jsonResult.code = 1;
            jsonResult.message='删除失败';
            res.json(jsonResult);
        }else{
            jsonResult.code = 0;
            jsonResult.message = '删除成功';
            res.json(jsonResult);
        }
    });
});

module.exports = router;