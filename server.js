const express = require('express');
const PORT = 5000;
const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://doongidoong:1234@cluster0-shard-00-00.gupvm.mongodb.net:27017,cluster0-shard-00-01.gupvm.mongodb.net:27017,cluster0-shard-00-02.gupvm.mongodb.net:27017/?ssl=true&replicaSet=atlas-132hlb-shard-0&authSource=admin&retryWrites=true&w=majority'
,{useNewUrlParser:true}).then(()=>{
    console.log('mongodb connect....')
}).catch((e)=>console.log(e));

app.use(express.json());

app.use("/api/products", productRoutes)

app.get('/', (req, res) => {
    res.send('Hello World');
});

//에러핸들러, 인자가 네 개, 미들웨어 가장 마지막
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
})
/*express는 미들웨어에서 에러가 발생하면 에러처리기로 보냄
그런데 비동기에서는 이런 에러처리기로 에러를 받지 못함.
따라서 에러를 next로 처리함
*/ 


// app.listen(PORT);
// console.log(`Running on port ${PORT}`)

module.exports = app;