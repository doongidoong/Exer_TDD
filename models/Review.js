const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'BasicProduct' },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    text: {
        type: String,
    },
    // accuse : { 'type': String, 'comment':String}
})//스키마 정의

const Review = mongoose.model("Review", reviewSchema)// 모델이름, 모델

module.exports = Review;