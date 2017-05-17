/**
 * Created by luyh on 2017/5/10.
 */
var mongoose = require('mongoose');
var commentSchema = require('../schemas/comments');

module.exports = mongoose.model('Comment',commentSchema);