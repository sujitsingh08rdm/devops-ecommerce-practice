const express = require("express");
const {
  addProductReview,
  getProductsReviews,
} = require("../../controllers/shop/product-review-controller");

const router = express.Router();

router.post("/add", addProductReview);
router.get("/:productId", getProductsReviews);

module.exports = router;
