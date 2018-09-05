const mongoose = require('mongoose');
const UserSchema = require('../Schema/UserSchema');


//创建一个userModel
const UserModel = mongoose.model('user',UserSchema);

module.exports = UserModel;

