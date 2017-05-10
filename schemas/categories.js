/**
 * Created by luyh on 2017/5/10.
 */
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    // 分类名称
    categoryname:{type:String, unique: true }
});