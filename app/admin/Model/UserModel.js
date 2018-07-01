const mongoose = require('mongoose');
const userSchema = require('../Schema/UserSchema');         //引入schema文件

const userModel = mongoose.model('user',userSchema);


module.exports = userModel;