/**
 * Created by luyh on 2017/5/10.
 */
var mongoose = require('mongoose');
var contentSchema = require('../schemas/contents');

module.exports = mongoose.model('Contnet',contentSchema);