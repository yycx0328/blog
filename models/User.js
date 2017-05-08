/**
 * Created by lyh_o on 2017/5/5.
 */
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');

module.exports = mongoose.model('User',usersSchema);