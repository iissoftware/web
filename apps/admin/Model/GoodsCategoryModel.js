const mongoose = require('mongoose');
const GoodsCategorySchema = require('../Schema/GoodsCategorySchema');


//创建一个GoodsCategory
const GoodsCategoryModel = mongoose.model('goods_categorys',GoodsCategorySchema);

module.exports = GoodsCategoryModel;