const Product = require("../models/Product");

// ➤ Vendor adds a new product
exports.addProduct = async (req, res) => {
  try {
    const { vendorId, name, category, price, imageUrl } = req.body;

    if (!vendorId || !name || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      vendorId,
      name,
      category,
      price,
      imageUrl
    });

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ➤ Get ALL products (buyer view)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendorId", "email");

    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

    const updatedProducts = products.map(product => {
      const isSurplus =
        Date.now() - new Date(product.createdAt).getTime() > THREE_DAYS;

      return {
        ...product._doc,
        isSurplus
      };
    });

    res.json(updatedProducts);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ➤ Get products by vendor (vendor dashboard)
exports.getVendorProducts = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const products = await Product.find({ vendorId });

    res.json(products);

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
