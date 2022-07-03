const productModel = require('../models/Product');
const UserModel = require('../models/User');
exports.findCap = async (req,res,next)=>{
    try{
        const found = await productModel.find({name:"Cap"})
        res.json(found);
    }
    catch(err){
        next(err)}
}
exports.findCapOrGloves = async (req,res,next)=>{
    try{
        const found = await productModel.find({$or:[{name:"Cap"},{name:"Gloves"}]})
        res.json(found);
    }
    catch(err){
        next(err)}
}

exports.findPriceOver = async (req,res,next)=>{
    try{
        const getprice = req.params.price;
        console.log(getprice);
        const found = await productModel.find({price:{$gt: getprice }},{ _id:false, name: true, price:true})
        res.json(found);
    }
    catch(err){
        next(err)}
}
exports.register = async(req, res,next)=>{

}

exports.populateUser = async(req,res,next)=>{
    try{
    }
    catch(err){
        next(err)
    }
}