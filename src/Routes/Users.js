const { Router } = require('express');
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/Users')

router.post("/", userController.createUsers);
router.post('/login', userController.loginUsers);
router.delete('/:id', userController.deleteUser);

module.exports = router