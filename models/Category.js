/**
 * Created by luyh on 2017/5/10.
 */
var mongoose = require('mongoose');
var categorySchema = require('../schemas/categories');

module.exports = mongoose.model('Category',categorySchema);