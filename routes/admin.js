const path = require('path');
const rootDir = require('../util/path');

const express = require('express');

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product",  (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log("in the product");
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
