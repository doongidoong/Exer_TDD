const express = require('express')
const router = express.Router();
const productController = require("../controller/products")

router.post('/',productController.createProduct) // server.js에 app.use("/api/products",productRoutes);로 저장되어 있음.
router.get('/',productController.getProducts)
router.get('/:productId',productController.getProductById)//
router.put('/:productId',productController.updateProduct)
router.delete('/:productId',productController.deleteProduct)
module.exports = router;
