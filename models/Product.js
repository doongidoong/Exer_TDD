const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})//스키마 정의

const Product = mongoose.model("Product", productSchema)// 모델이름, 모델

module.exports = Product;