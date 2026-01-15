const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getVendorOrders,
  confirmOrder, // add this
} = require("../controllers/order.controller");

const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// Buyer routes
router.post("/", protect, restrictTo("buyer"), placeOrder);
router.get("/my", protect, restrictTo("buyer"), getMyOrders);

// Vendor routes
router.get("/vendor", protect, restrictTo("vendor"), getVendorOrders);

// Vendor confirms order
router.patch("/:orderId/confirm", protect, restrictTo("vendor"), confirmOrder);

module.exports = router;
