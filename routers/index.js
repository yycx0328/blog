/**
 * Created by luyh on 2017/5/5.
 */
var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Content = require('../models/Content');
var Comment = require('../models/Comment');
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
        content.views +=1;
        return content.save();
    }).then(function (newContent) {
        data.content = newContent;
        res.render('detail',data);
    });
});

router.post('/send_comment',function (req,res,next) {
    var content_id = req.body.content_id;
    var text = req.body.text_comment;
    var user_id = req.userInfo._id;
    var comment = new Comment({
        content:content_id,
        user:user_id,
        text:text
    });
    comment.save().then(function (newComment) {
        Comment.find({content:content_id}).sort({createtime:-1}).populate(['user']).then(function (comments) {
            jsonResult.code = 0;
            jsonResult.message = "评论成功";
            jsonResult.comments = comments;
            res.json(jsonResult);
        });
    });
});

module.exports = router;