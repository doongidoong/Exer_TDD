const express= require('express');
const mongoose = require('mongoose');
const PORT= 5000
mongoose.connect('mongodb://doongidoong:1234@cluster0-shard-00-00.gupvm.mongodb.net:27017,cluster0-shard-00-01.gupvm.mongodb.net:27017,cluster0-shard-00-02.gupvm.mongodb.net:27017/?ssl=true&replicaSet=atlas-132hlb-shard-0&authSource=admin&retryWrites=true&w=majority'
,{useNewUrlParser:true}).then(()=>{
    console.log('mongodb connect....')
}).catch((e)=>console.log(e));
const app = express();
const productRoutes = require('./routes')
app.use(express.json())

app.use("/api/products",productRoutes);
app.get('/',(req,res)=>{
    res.send('Hello world');
})


app.listen(PORT)
console.log(`Running on port ${PORT}`)