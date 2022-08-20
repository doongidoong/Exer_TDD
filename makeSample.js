const {faker} = require('@faker-js/faker');
const productModel = require('./models/Product');
const basicproductModel = require('./models/BasicProduct');
const reviewModel = require('./models/Review');
const userModel = require('./models/User')
const storeModel = require('./models/Store')

const mongoose = require('mongoose');


mongoose.connect(MongoURI,{useNewUrlParser:true}).then(()=>{
    console.log('mongodb connect....')
}).catch((e)=>console.log(e));

const adminUserMaker = async(iter)=>{
    let name, email, admin, role;
    for(let i = 0; i < iter; i++){
        name =faker.name.findName()
        email = faker.internet.email();
        admin = email;
        role = 'admin';
        const created = await userModel.create({'name':name, 'email': email, 'admin': admin, 'role':role })
        console.log(`${JSON.stringify(created)}가 생성되었습니다.`)
    }
    
}

const normalUserMaker = async(iter, inputEmail)=>{
    let name, email, admin, role;
    for(let i = 0; i < iter; i++){
        name =faker.name.findName()
        email = faker.internet.email();
        admin = inputEmail;
        role = 'seller';
        const created = await userModel.create({'name':name, 'email': email, 'admin': admin, 'role':role })
        console.log(`${i}번째인 ${JSON.stringify(created)}가 생성되었습니다.`)
    }
    
}

const storeMaker = async(inputEmail)=>{
    let name, email
    try{
        name =faker.name.findName()
        email = inputEmail
        const created = await storeModel.create({'name':name, 'email': email })
        console.log(`${inputEmail}의 ${JSON.stringify(created)}가 생성되었습니다.`)
    }
    catch{
        console.log(inputEmail, "은 이미 스토어를 소지하고 있습니다")
    }
}
    
const productMaker = async(iter)=>{
    let name;
    try{
        for(let i=0;i<iter;i++){
            name=faker.commerce.product();
            const created = await productModel.create({'name':name})
            console.log(`${JSON.stringify(created)}가 생성되었습니다.`)
        }
    }
    catch{
        console.log("생성할 수 없습니다.")
    }
}

const BasicMaker= async(iter, id)=>{
    let name, option, price;
    try {
        for(let i=0;i<iter;i++){
            name=faker.commerce.productName();
            option = faker.color.human();
            price = faker.commerce.price(100, 200,0);
            const created = await basicproductModel.create({'name':name,'product':id,'option':option,'price':price})
            console.log(`${id}의 ${JSON.stringify(created)}가 생성되었습니다.`)
        }   
    } catch (error) {
        console.log("생성할 수 없습니다.")
    }
}

const makeCombi = async()=>{
    let writers = await userModel.find({},{_id:1})
    let products = await basicproductModel.find({},{_id:1})
    let stores = await storeModel.find({},{_id:1})
    return {writers, products, stores}
}
const reviewMaker = async(iter)=>{
    let text;
    let {writers, products, stores} = await makeCombi();
    for(i=0;i<iter;i++){
        text = faker.lorem.paragraphs();
        const created = await reviewModel.create({'writer':writers[i]._id,'product':products[i]._id,'store':stores[i]._id,'text':text})
        console.log(`${i}의 ${JSON.stringify(created)}가 생성되었습니다.`)
    }
}


// productMaker(3).then(res=>{
    // productModel.find({})
    //     .then((result) => {
    //     result.reduce( async (prev, res) =>{
    //         await prev;
    //         console.log(res._id, ' 상품의 ')
    //         const newPro = await BasicMaker(2, res._id)
    //     },Promise.resolve());
    // })
// })

// adminUserMaker(3).then(res=>{    
//     userModel.find({})
//     .then((result) => {
//         result.reduce( async (prev, res) =>{
//             await prev;
//             if(res.role==='admin'){
//                 console.log(res.email,' 관리자 이메일로')
//                 const newPro = await normalUserMaker(3, res.email)}
//         },Promise.resolve());
//     });
// })
//이렇게 하면 순서대로 세개 만들어줌

// userModel.find({})
//     .then((result) => {
//         result.reduce( async (prev, res) =>{
//             await prev;
//             if(res.role==='admin'){
//                 const newPro = await storeMaker(res.email)}
//         },Promise.resolve())});
// reviewMaker(3)


// adminUserMaker(3).then(res=>{    
//     userModel.find({})
//     .then((result) => {
//         Promise.all(result.map(async (res)=>{
//             console.log(res.email,' 관리자 이메일로')
//             await normalUserMaker(3, res.email)
//         }))
//     });
// })
// //이렇게하면 순서대로 처리하지는 않는다. 그래도 세개씩 만들어는 준다.
