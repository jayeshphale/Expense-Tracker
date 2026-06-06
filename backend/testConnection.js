const mongoose = require("mongoose");
require("dotenv").config();

console.log("Testing MongoDB connection...");
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000
  })
  .then(() => {
    console.log("✓ MongoDB Connected Successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("✗ Connection Failed:");
    console.error("Error:", err.message);
    console.error("Code:", err.code);
  });
