const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/AgriLink");
  console.log("MongoDB Connected");
};

module.exports = connectDB;
