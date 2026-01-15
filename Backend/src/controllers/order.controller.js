const Order = require("../models/order.model");
const Product = require("../models/product.model");

// ---------------- PLACE ORDER (buyer) ----------------
exports.placeOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Create order as "pending", do NOT reduce stock yet
    const order = await Order.create({
      buyer: req.user.id,
      vendor: product.vendor,
      items: [{ product: productId, quantity }],
      status: "pending",
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET ORDERS FOR BUYER ----------------
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id })
      .populate("items.product", "name price")
      .populate("vendor", "name email");
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- GET ORDERS FOR VENDOR ----------------
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.user.id })
      .populate("items.product", "name price")
      .populate("buyer", "name email");
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- CONFIRM ORDER (vendor) ----------------
exports.confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("items.product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order already processed" });
    }

    // Update stock for each product and apply surplus discount
    for (let item of order.items) {
      const product = await Product.findById(item.product._id);
      if (!product) continue;

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for product: ${product.name}`,
        });
      }

      // Apply surplus discount if applicable
      if (product.isSurplus && product.surplusDiscount) {
        item.price = product.price - (product.price * product.surplusDiscount) / 100;
      } else {
        item.price = product.price;
      }

      product.quantity -= item.quantity;
      await product.save();
    }

    // Mark order as confirmed
    order.status = "confirmed";
    await order.save();

    res.json({ message: "Order confirmed successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
