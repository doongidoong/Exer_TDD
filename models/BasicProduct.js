const mongoose = require('mongoose');

const basicProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    option: {
        type: String
    },
    price: {
        type: Number
    }
})//스키마 정의

const BasicProduct = mongoose.model("basicproduct", basicProductSchema)// 모델이름, 모델

module.exports = BasicProduct;