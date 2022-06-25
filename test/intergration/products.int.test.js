const request = require('supertest');
const app = require('../../server');
const newProduct = require('../data/new-product.json');

//Create Test
let firstProduct;

it("POST /api/products", async () => {
    const response = await request(app)
        .post("/api/products")
        .send(newProduct);
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(newProduct.name)
    expect(response.body.description).toBe(newProduct.description)
})

//에러 테스트
it("should return 500 on POST /api/products", async () => {
    const response = await request(app)
        .post('/api/products')
        .send({ name: "phone" }) //에러 값을 넣을 경우
    expect(response.statusCode).toBe(500);//서버 에러 500이 발생
    expect(response.body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required." })
})

it("GET /api/products", async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();//배열인지 아닌지 파악
    expect(response.body[0].name).toBeDefined();//변수가 undefined인지 아닌지
    expect(response.body[0].description).toBeDefined();//name과 description은 필수로 설정해놓았음
    firstProduct = response.body[0]
})

it("GET /api/products/:productId", async () => {
    const response = await request(app).get('/api/products/' + firstProduct._id)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(firstProduct.name)
    expect(response.body.description).toBe(firstProduct.description)
})
it("GET id doenst exist /api/products/:productId", async () => {
    const response = await request(app).get('/api/products/5f5cb1f145b82ecaf43e3877')//너무 ID가 다르면 몽고DB가 다른 에러를 주게 됨
    expect(response.statusCode).toBe(404);
})
