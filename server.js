const express = require('express');
const PORT = 5000;
const app = express();
const productRoutes = require('./routes/productRoutes');
const testRoutes = require('./routes/testRoutes');
const reviewRoutes = require('./routes/reviewRouter')
const mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config();
const {MONGO_URI} = process.env


mongoose.connect(MONGO_URI,{useNewUrlParser:true}).then(()=>{
    console.log('mongodb connect....')
}).catch((e)=>console.log(e));
app.use(cors());
app.use(express.json());



app.use("/api/products", reviewRoutes)
app.use("/api/products", productRoutes)
app.use("/api/test", testRoutes)

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


app.listen(PORT);
console.log(`Running on port ${PORT}`)

module.exports = app;