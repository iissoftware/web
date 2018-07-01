const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    tel: String,
    password: String,
    sex: {
        type: String,
        default: '男'
    },
    age: Number,
    job: String
});


module.exports = userSchema;