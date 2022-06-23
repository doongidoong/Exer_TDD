const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

productModel.create = jest.fn()//mock 함수, 가짜 함수 spy역할을 함
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
        expect(res._isEndCalled()).toBeTruthy();//send가 잘되었는지 확인
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