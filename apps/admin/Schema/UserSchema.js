const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;


//创建一个userSchema
let userSchema = new Schema({
    username: {
        type: String,
        unique: true,           //唯一
        require: true           //非空
    },
    password: {
        type: String,
        require: true
    },
    sex: {
        type: String,
        default: '男'
    },
    mobile: {
        type: String
    },
    email: String,
    src: {
        type: String,
        default: ''
    },
    create_time: {                    //创建时间
        type: Date,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    update_time: {                      //更新时间
        type: Date,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    },
    token: {
        type: String,
        default: ''
    }
});


module.exports = userSchema;