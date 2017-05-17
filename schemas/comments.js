/**
 * Created by luyh on 2017/5/10.
 */
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    // 评论时间
    content:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Content'
    },
    // 评论人
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // 评论内容
    text:String,
    // 评论时间
    createtime:{
        type:Date,
        default:new Date()
    }
});