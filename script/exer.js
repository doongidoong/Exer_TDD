const productModel = require('../models/Product');
const basicproductModel = require('../models/BasicProduct');
const reviewModel = require('../models/Review');
const userModel = require('../models/User')
const storeModel = require('../models/Store')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017',{useNewUrlParser:true}).then(()=>{
    console.log('mongodb connect....')
}).catch((e)=>console.log(e));

const aggregated = reviewModel.aggregate([
    {   $lookup: {
        from: "basicproducts",
        localField: "product",
        foreignField: "_id",
        as: "basicproduct"
      }}
      ,{$unwind:'$basicproduct'}
      ,{   $lookup: {
        from: "products",
        localField: "basicproduct.product",
        foreignField: "_id",
        as: "product"
      }}
      ,{$unwind:'$product'}
      ,{$match:{'product.name':'Chicken'}}
    
]).then((res)=>res.map((r)=>{console.log(JSON.stringify(r),"입니다 \n")}))
