const express = require('express')
const router = express.Router();
const reviewController = require("../controller/reivew")

router.post('/product',reviewController.createProduct) // server.js에 app.use("/api/products",productRoutes);로 저장되어 있음.
router.post('/basic',reviewController.createBasic) // server.js에 app.use("/api/products",productRoutes);로 저장되어 있음.
router.post('/review',reviewController.createReivew) // server.js에 app.use("/api/products",productRoutes);로 저장되어 있음.

router.search('/search',reviewController.search)
module.exports = router;
