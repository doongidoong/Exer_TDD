const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');
const allProducts = require('../data/all-products.json');

/* 함께 콜을 되었다는 것을 파악하려면 필수 */
productModel.create = jest.fn()//mock 함수, 가짜 함수 spy역할을 함
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndDelete = jest.fn();

const productId = '62b499e8e6e12c2cef6a0138';
const updatedProduct = {name:'name1', description:'desc2'}
let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn()
})//같은 스코프 안의 모든 it이 시작되기 전에 시작됨.현재는 글로벌


describe("Product Controller Create", () => {
    beforeEach(() => {
        req.body= newProduct;
    })//같은 스코프 안의 모든 it이 시작되기 전에 시작됨.

    it("should have a createProduct funtcion", () => {
        expect(typeof productController.createProduct).toBe("function")//createProduct를 가져와 type을 체크, 즉 함수가 있는지 테스트
    })
    it("should call ProductModel.create", async () => {
        await productController.createProduct(req,res,next); //create product가 호출되면 
        expect(productModel.create).toBeCalledWith(newProduct); // product가 생성되는지 파악
    })
    it("should return 201 response code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);//create가 완료되면 201 status가 와야함. 강제로 보내준 상태
        expect(res._isEndCalled()).toBeTruthy();//send가 잘되었는지 확인, True 인지 
    })
    it("should return json body in response", async () => {
        productModel.create.mockReturnValue(newProduct) //mockfunction에 리턴값을 임의로 지정, 현재 mongodb 의존 없이 하는 중 
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct)//json 객체로 잘오는 지 
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "description property missing" };//원래라면 db에서 에러를 반환하지만 테스트에서 db에 의존하지 않기 때문에 에러 메시지를 임의로 만듦
        const rejectedPromise = Promise.reject(errorMessage);//에러 발생 시 reject (없으면 계속 대기)
        productModel.create.mockReturnValue(rejectedPromise); 
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);//next는 에러메시지
    })
})

describe("Product Controller Get", () => {
    // beforeEach(() => {
    //     req.body= newProduct;
    // })//같은 스코프 안의 모든 it이 시작되기 전에 시작됨.

    it("should have a getProducts funtcion", () => {
        expect(typeof productController.getProducts).toBe("function");
    })
    it("should call ProductModel.find({})", async () => {
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({})//어떤 것과 같이 호출되는지 확인을 위해 jest.fn이 필요
    })
    it("should return 200 response", async () => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    })
    it("should return json body in response", async () => {
        productModel.find.mockReturnValue(allProducts)
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts)
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "description property missing" };
        const rejectedPromise = Promise.reject(errorMessage);//몽고 db 또한 비동기로 에러를 처리함. 에러를 직접 넣어줌
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe("Product Controller GetById", () => {
    it("should have a getProductById", () => {
        expect(typeof productController.getProductById).toBe("function")
    })
    it("should call productMode.findById", async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId)
    })
    it("should return json body and reponse code 200", async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return 404 when item doesnt exist", async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);//없을 때는 404 return
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "error" };
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.findById.mockReturnValue(rejectedPromise)
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe("Product Controller Update", () => {
    it("should have a getProductById", () => {
        expect(typeof productController.getProductById).toBe("function")
    })
    it("should call productMode.findById", async () => {
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId)
    })
    it("should return json body and reponse code 200", async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should return 404 when item doesnt exist", async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);//없을 때는 404 return
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "error" };
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.findById.mockReturnValue(rejectedPromise)
        await productController.getProductById(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})
describe("Product Controller Update", () => {
    it("should have an updateProduct function", () => {
        expect(typeof productController.updateProduct).toBe("function")
    })
    it("should call productMode.findByIdAndUpdate", async () => {
        req.params.productId = productId
        req.body = updatedProduct
        await productController.updateProduct(req, res, next);
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId, updatedProduct,
            { new: true }
        )//인자가 위 3가지가 들어감
    })

    it("should return json body and response code 200", async () => {
        req.params.productId = productId
        req.body = updatedProduct
        productModel.findByIdAndUpdate.mockReturnValue(updatedProduct)
        await productController.updateProduct(req, res, next)
        expect(res._isEndCalled()).toBeTruthy();
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(updatedProduct)
    })

    it("should handle 404 when item doesnt exist", async () => {
        productModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.updateProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })


    it("should handle errors", async () => {
        const errorMessage = { message: "Error" };
        const rejectPromise = Promise.reject(errorMessage);
        productModel.findByIdAndUpdate.mockReturnValue(rejectPromise);
        await productController.updateProduct(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage)
    })

})

describe("Product Controller Delete", () => {
    it("should have a deleteProduct function", () => {
        expect(typeof productController.deleteProduct).toBe("function")
    })
    it("should call ProductModel.findByIdAndDelete", async () => {
        req.params.productId = productId;
        await productController.deleteProduct(req, res, next)
        expect(productModel.findByIdAndDelete).toBeCalledWith(productId)
    })
    it("should return 200 response ", async () => {
        let deletedProduct = {
            name: "deletedProduct",
            description: "it is deleted"
        }
        productModel.findByIdAndDelete.mockReturnValue(deletedProduct)
        await productController.deleteProduct(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(deletedProduct)
        expect(res._isEndCalled()).toBeTruthy();
    })
    it("should handle 404 when item doenst exist", async () => {
        productModel.findByIdAndDelete.mockReturnValue(null);
        await productController.deleteProduct(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should handle errors", async () => {
        const errorMessage = { message: "Error deleting" }
        const rejectedPromise = Promise.reject(errorMessage)
        productModel.findByIdAndDelete.mockReturnValue(rejectedPromise)
        await productController.deleteProduct(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})