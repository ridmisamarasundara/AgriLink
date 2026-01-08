const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  getVendorProducts
} = require("../controllers/productController");

// Vendor add product
router.post("/add", addProduct);

// Buyer get all products
router.get("/all", getAllProducts);

// Vendor get own products
router.get("/vendor/:vendorId", getVendorProducts);

module.exports = router;
