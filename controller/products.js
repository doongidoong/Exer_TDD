const productModel = require('../models/Product');
exports.createProduct =  async (req,res,next)=>{
    try {   const createdProduct = await productModel.create(req.body); //req body가 생성됨
    console.log('create',createdProduct);
    res.status(201).json(createdProduct);
    }catch (error){
        next(error); //이렇게 error를 next로 보내주어야 함. 비동기이므로
    }
}
