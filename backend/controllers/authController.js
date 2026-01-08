const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { role, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ role, email, password: hashed });

  res.json({ message: "Registration successful" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: "Invalid login" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid login" });

  res.json({ message: "Login successful", role: user.role });
};
