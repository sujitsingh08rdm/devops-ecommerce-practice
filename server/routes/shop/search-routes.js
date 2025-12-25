const express = require("express");
const { searchProducts } = require("../../controllers/shop/search-controller");

//this will get us the router interface
const router = express.Router();

router.get("/:keyword", searchProducts);

module.exports = router;
