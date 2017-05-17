/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');
var jsonResult = {
    code:-1,
    message:'初始化异常'
};

router.use(function (req,res,next) {
    var top = 4;
    Content.find().sort({createtime:-1}).limit(top).then(function (contents) {
        req.newestContents = contents;
        next();
    });
});

router.get('/',function (req, res,next) {
    var data = {
        userInfo:req.userInfo,
        newestContents:req.newestContents,
        category:req.query.category||'',
        categories:[],
        count:0,
        page:Number(req.query.page||1),
        limit:4,
        pages:0,
        pageArr:[],
        contents:[]
    };
    var where={};
    if(data.category!=''){
        where.category = data.category;
    }
    Category.find().then(function (categories) {
        data.categories = categories;
        return Content.count(where);
    }).then(function (count) {
        data.count = count;
        data.pages = Math.ceil(data.count/data.limit);
        for (var i=1; i<=data.pages;i++){
            data.pageArr.push(i);
        }
        data.page = Math.min(data.page,data.pages);
        data.page = Math.max(data.page,1);
        var skip = (data.page-1)*data.limit;
        return Content.find(where).limit(data.limit).skip(skip).populate(['category','user']).sort({createtime:-1});
    }).then(function (contents) {
        data.contents = contents;
        res.render('index',data);
    });
});

router.get('/detail',function (req,res,nex) {
    res.render('detail');
});

module.exports = router;