const Product = require("../models/product.model");

// CONFIG
const SURPLUS_AFTER_DAYS = 2;

// Utility function
const checkSurplus = (createdAt) => {
  const diffDays =
    (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24);
  return diffDays >= SURPLUS_AFTER_DAYS;
};

// ---------------- CREATE PRODUCT ----------------
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      vendor: req.user.id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------- GET ALL PRODUCTS (AUTO SURPLUS) ----------------
// ---------------- GET ALL PRODUCTS ----------------
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name email");

    const today = new Date();

    for (let product of products) {
      const diffDays = (today - new Date(product.createdAt)) / (1000 * 60 * 60 * 24);

      // Auto mark surplus after 2 days
      if (diffDays >= 2 && !product.isSurplus) {
        product.isSurplus = true;
        product.surplusDate = today;
        product.surplusDiscount = 20; // default
        await product.save();
      }

      // Auto remove surplus after 7 days
      if (product.isSurplus && product.surplusDate) {
        const surplusDays = (today - new Date(product.surplusDate)) / (1000 * 60 * 60 * 24);
        if (surplusDays >= 7) {
          await product.remove();
        }
      }
    }

    // Filter surplus if query used
    if (req.query.surplus === "true") {
      return res.json({
        products: (await Product.find({ isSurplus: true })).map(p => ({
          ...p._doc,
        })),
      });
    }

    res.json({ products: await Product.find().populate("vendor", "name email") });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- GET SINGLE PRODUCT ----------------
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "vendor",
      "name location"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Auto surplus check
    if (!product.isSurplus && checkSurplus(product.createdAt)) {
      product.isSurplus = true;
      product.surplusDate = new Date();
      await product.save();
    }

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET LOGGED-IN VENDOR PRODUCTS ----------------
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- UPDATE PRODUCT ----------------
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.vendor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You cannot update this product" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- DELETE PRODUCT ----------------
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.vendor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You cannot delete this product" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.markAsSurplus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    product.isSurplus = true;
    product.surplusDate = new Date();
    await product.save();

    res.json({ message: "Product marked as surplus", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
