const mongoose = require('mongoose');
const ShopListSchema = require('../Schema/ShopListSchema');


//创建一个ShopListModel
const ShopListModel = mongoose.model('shoplists',ShopListSchema);

module.exports = ShopListModel;

