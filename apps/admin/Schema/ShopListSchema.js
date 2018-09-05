const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


//创建一个ShopListSchema
let ShopListSchema = new Schema({
    _id: Number,
    name: String,
    star: Number,
    img: String,
    c_time: Date,
    u_time: Date,
    sales: Number,
    brand: Boolean,
    distance: String,
    take_off: Number,
    dispatch: Number
});


module.exports = ShopListSchema;