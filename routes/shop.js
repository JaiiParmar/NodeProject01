const path = require('path');

const express = require('express');

const router = express.Router();

router.get("/", (req, res, next) => {
//   console.log("in the home");
//   res.send("<h1>Hello form Express!</h1>");
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
});


module.exports = router;
