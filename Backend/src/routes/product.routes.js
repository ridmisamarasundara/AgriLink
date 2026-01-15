const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getMyProducts, // make sure this is imported
  markAsSurplus,
} = require("../controllers/product.controller");

const { protect, restrictTo } = require("../middleware/auth.middleware");

const router = express.Router();

// ---------------- VENDOR ROUTES ----------------
// Only vendors can create, update, delete, or view their own products
router.post("/", protect, restrictTo("vendor"), createProduct);
router.get("/mine", protect, restrictTo("vendor"), getMyProducts);
router.put("/:id", protect, restrictTo("vendor"), updateProduct);
router.delete("/:id", protect, restrictTo("vendor"), deleteProduct);
router.put(
  "/:id/surplus",
  protect,
  restrictTo("vendor"),
  markAsSurplus
);

// ---------------- PUBLIC ROUTES ----------------
// Any authenticated user can view products
router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);

module.exports = router;
