const express = require('express');
const { route } = require('./Products');

const productRouter = require('./Products');
const userRouter = require('./Users');
const orderRouter = require('./Orders');
const categoryRouter = require('./Categories');

const router = express.Router();

router.get('/', (req, res, next ) => {
    res.json({ success: true, message: "This is api for coffe shop" })
})

// Route list  products
router.use('/products', productRouter);
// Route List User
router.use('/users', userRouter);
// Route List Orders
router.use('/orders', orderRouter);
// Route List Categories
router.use('/categories', categoryRouter);

router.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Wrong url, Please check doocumentation"
    })
})

module.exports = router;