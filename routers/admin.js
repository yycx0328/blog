/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var User = require('../models/User');
var Category = require('../models/Category');
var Content = require('../models/Content');
var router = express.Router();
var jsonResult = {
    code:-1,
    message:'初始化异常'
};

router.use(function (req,res,next) {
    if(!req.userInfo || !Boolean(req.userInfo.isAdmin)){
        res.render('admin/forbid');
        return;
    }
    else{
        jsonResult.userInfo = req.userInfo;
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
    User.find({},function (err,users) {
        if(err){
            jsonResult.message = '异常';
            res.json(jsonResult);
            return;
        }// 查询成功
        if(users){
            jsonResult.code = 0;
            jsonResult.message='成功';
            jsonResult.users = users;
        }
        else{
            jsonResult.message = '无显示结果';
        }
        res.render('admin/users',jsonResult);
    });
});

// 获取分类列表
router.get('/categories',function (req,res,next) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;
    Category.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count/limit);
        // 取值不能大于pages
        page = Math.min(page,pages);
        // 取值不能小于1
        page = Math.max(page,1);
        var skip = (page-1)*limit;
        var pageArr=[];
        for (var i=1;i<=pages;i++){
            pageArr.push(i);
        }
        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function (categories) {
            // 查询成功
            if(categories){
                res.render('admin/categories',{
                    userInfo:req.userInfo,
                    categories:categories,
                    count:count,
                    pages:pages,
                    pageArr:pageArr,
                    limit:limit,
                    page:page
                });
            }
            else{
                jsonResult.code = 1;
                jsonResult.message = '无显示结果';
            }
        });
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

// 获取文章列表
router.get('/contents',function (req,res,next) {
    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;
    Content.count().then(function (count) {
        // 计算总页数
        pages = Math.ceil(count/limit);
        // 取值不能大于pages
        page = Math.min(page,pages);
        // 取值不能小于1
        page = Math.max(page,1);
        var skip = (page-1)*limit;
        var pageArr=[];
        for (var i=1;i<=pages;i++){
            pageArr.push(i);
        }
        Content.find().sort({_id:-1}).limit(limit).skip(skip).populate('category').populate('user').then(function (contents) {
            // 查询成功
            if(contents){
                res.render('admin/contents',{
                    userInfo:req.userInfo,
                    contents:contents,
                    count:count,
                    pages:pages,
                    pageArr:pageArr,
                    limit:limit,
                    page:page
                });
            }
            else{
                jsonResult.code = 1;
                jsonResult.message = '无显示结果';
            }
        });
    });
});

// 添加文章渲染页
router.get('/content/add',function (req,res,next) {
    Category.find().then(function (categories) {
        res.render('admin/content_add',{
            userInfo:req.userInfo,
            categories:categories
        });
    });
});

// 添加文章操作
router.post('/content/add',function (req,res,next) {
    console.log(req.body);
    var category = req.body.category;
    var title = req.body.title;
    var abstract = req.body.abstract;
    var text = req.body.text;
    if(category == ''){
        jsonResult.code = 1;
        jsonResult.message = '请选择分类';
        res.json(jsonResult);
        return;
    }

    if(title == ''){
        jsonResult.code = 2;
        jsonResult.message = '文章标题不能为空';
        res.json(jsonResult);
        return;
    }

    if(abstract == ''){
        jsonResult.code = 3;
        jsonResult.message = '文章简介不能为空';
        res.json(jsonResult);
        return;
    }

    if(text == ''){
        jsonResult.code = 4;
        jsonResult.message = '文章内容不能为空';
        res.json(jsonResult);
        return;
    }
    new Content({
        category:category,
        user:req.userInfo._id,
        title:title,
        abstract:abstract,
        text:text
    }).save().then(function (newContent) {
        if(newContent){
            jsonResult.code = 0;
            jsonResult.message = '保存成功';
            res.json(jsonResult);
        }
        else{
            jsonResult.code = 5;
            jsonResult.message = '保存失败';
            res.json(jsonResult);
        }
    });
});

module.exports = router;