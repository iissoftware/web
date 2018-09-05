const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//创建一个goodsCategorySchema
let goodsCategorySchema = new Schema({
    _id: Number,
    name: String,
    img: String,
    level: Number
});


module.exports = goodsCategorySchema;