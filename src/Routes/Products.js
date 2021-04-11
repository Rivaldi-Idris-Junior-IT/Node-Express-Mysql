const { Router } = require('express');
const express = require('express');
const router = express.Router();
const productController = require('../Controllers/Products')

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/conditions", productController.getConditionProducts);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router