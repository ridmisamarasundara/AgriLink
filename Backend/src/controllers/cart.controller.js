const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ buyer: buyerId });
    if (!cart) {
      cart = new Cart({ buyer: buyerId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart items
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ buyer: req.user.id }).populate("items.product", "name price");
    if (!cart) return res.json({ items: [] });
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ buyer: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
