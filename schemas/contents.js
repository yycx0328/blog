/**
 * Created by luyh on 2017/5/10.
 */
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    // 文章分类
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    // 创建者
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // 文章标题
    title:String,
    abstract:{
        type:String,
        default:''
    },
    text:{
        type:String,
        default:''
    },
    // 创建时间
    createtime:{
        type:Date,
        default:new Date()
    },
    // 阅读量
    views:{
        type:Number,
        default:0
    },
    comments:[]
});