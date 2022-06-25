const productModel = require('../models/Product');
exports.createProduct =  async (req,res,next)=>{
    try {   
        const createdProduct = await productModel.create(req.body); //req body가 생성됨
        res.status(201).json(createdProduct);
    }catch (error){
        next(error); //이렇게 error를 next로 보내주어야 함. 비동기이므로
    }
}

exports.getProducts = async (req,res,next)=>{
    try{
        const allProducts= await productModel.find({});//productModel의 {] = 모든 것을 가져옴, {}과 같이 호출됨
        res.status(200).json(allProducts);
    }catch(error){
        next(error);
    }
}

exports.getProductById = async (req,res,next)=>{
    try{
        const product= await productModel.findById(req.params.productId);
        if(product)res.status(200).json(product);
        else res.status(404).send();//json이 없다면 send까지 해주어야 함
    }catch(error){
        next(error);
    }
}