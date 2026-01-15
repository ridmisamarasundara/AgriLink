const Product = require("../models/product.model");

module.exports = async () => {
  const EXPIRE_DAYS = 7;

  const products = await Product.find();

  for (const p of products) {
    const daysOld =
      (new Date() - new Date(p.createdAt)) / (1000 * 60 * 60 * 24);

    if (daysOld >= EXPIRE_DAYS) {
      await p.deleteOne();
    }
  }
};
