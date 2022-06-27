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

exports.updateProduct = async (req,res,next)=>{
    try{
        const updatedProduct= await productModel.findByIdAndUpdate(req.params.productId
            ,req.body
            ,{new:true});//원래라면 new false이므로, 업데이트 이전 값을 리턴함. true로 변경하므로 업데이트된 이후 값 리턴
        if(updatedProduct) res.status(200).json(updatedProduct)
        else res.status(404).send();
    }catch(error){
        next(error);
    }
}


exports.deleteProduct = async (req,res,next)=>{
    try{
        const deletedProduct= await productModel.findByIdAndDelete(req.params.productId);
        if(deletedProduct) res.status(200).json(deletedProduct)
        else res.status(404).send();
    }catch(error){
        next(error);
    }
}



