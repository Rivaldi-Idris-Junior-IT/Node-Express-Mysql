const { Router } = require('express');
const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/Orders')

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.delete("/:id", orderController.deleteOrder);
router.put("/:id", orderController.updateOrder);
router.get("/conditions", orderController.getConditionOrders);

module.exports = router