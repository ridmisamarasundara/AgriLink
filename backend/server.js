const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
console.log("Check URI:", process.env.MONGO_URI);
connectDB();

// app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/userRoutes'));
// app.use("/api/auth", require("./routes/authRoutes"));

// app.use("/api/products", require("./routes/productRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});