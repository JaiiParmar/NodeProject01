const path = require('path');
const productsConroller = require('../controllers/products');

const express = require('express');
const router = express.Router();

router.get('/', productsConroller.getProducts);
 
module.exports = router;
