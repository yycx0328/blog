/**
 * Created by lyh_o on 2017/5/5.
 */
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    // 用户名
    username:{type:String, unique: true },
    // 用户密码
    password:String
});