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
var data = {};

router.use(function (req,res,next) {
    var top = 4;
    data.userInfo=req.userInfo;
    Category.find().then(function (categories) {
        data.categories = categories;
        return Content.find().sort({createtime:-1}).limit(top);
    }).then(function (contents) {
        data.newContents=contents;
        return Content.find().sort({views:-1}).limit(top);
    }).then(function (hotContents) {
        data.hotContents = hotContents;
        next();
    });
});

router.get('/',function (req, res,next) {
    data.category=req.query.category||'';
    data.count=0;
    data.page=Number(req.query.page||1);
    data.limit=4;
    data.pages=0;
    data.pageArr=[];
    data.contents=[];

    var where={};
    if(data.category!=''){
        where.category = data.category;
    }
    Content.count(where).then(function (count) {
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

router.get('/detail',function (req,res,next) {
    var contentid = req.query.id;
    Content.findOne({_id:contentid}).populate('user').then(function (content) {
        data.content = content;
        res.render('detail',data);
    });
});

module.exports = router;