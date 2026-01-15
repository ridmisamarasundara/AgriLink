const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/cart.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// Only buyers can manage cart
router.post("/", protect, restrictTo("buyer"), addToCart);
router.get("/", protect, restrictTo("buyer"), getCart);
router.delete("/:productId", protect, restrictTo("buyer"), removeFromCart);

module.exports = router;
