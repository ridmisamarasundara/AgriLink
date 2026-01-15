require("dotenv").config();
const app = require("./app"); 
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const chatSocket = require("./sockets/chat.socket");

const PORT = process.env.PORT || 5000;

// HTTP server for Socket.IO
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: { origin: "*" }
});

// Initialize chat sockets
chatSocket(io);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
