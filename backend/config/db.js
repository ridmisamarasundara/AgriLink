const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // We strictly use process.env.MONGO_URI here
    const conn = await mongoose.connect(process.env.MONGO_URI,{
    dbName: 'AgriLink',
  });

    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Active Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
