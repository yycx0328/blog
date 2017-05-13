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
    // 文章标题
    title:String,
    abstract:{
        type:String,
        default:''
    },
    text:{
        type:String,
        default:''
    }
});