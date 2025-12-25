const express = require("express");
const {
  addToCart,
  updateCartItemQuantity,
  fetchCartItems,
  deleteCartItem,
} = require("../../controllers/shop/cart-controller");

//this will get us the router interface
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
