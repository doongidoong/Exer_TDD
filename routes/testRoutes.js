const express = require('express')
const router = express.Router();
const testController = require("../controller/exer")

router.get('/hellow', (req,res)=>{
    return "Helloworld"
})

router.get('/1',testController.findCap)

router.get('/2',testController.findCapOrGloves)

router.get('/3/:price',testController.findPriceOver)
module.exports = router;
