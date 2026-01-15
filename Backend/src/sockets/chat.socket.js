const Message = require("../models/message.model");
const User = require("../models/User.model");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join user room
    socket.on("joinUser", async (userId) => {
      const user = await User.findById(userId);
      if (!user) return;

      socket.join(userId);
      console.log(`${user.role} ${userId} joined their room`);
    });

    // Handle sending message
    socket.on("sendMessage", async (data) => {
      try {
        // Validate sender and receiver
        const sender = await User.findById(data.senderId);
        const receiver = await User.findById(data.receiverId);

        if (!sender || !receiver) return;

        // Only allow buyer ↔ vendor
        if (sender.role === receiver.role) return;

        // Save message
        const newMessage = new Message(data);
        await newMessage.save();

        // Emit to receiver
        io.to(data.receiverId).emit("receiveMessage", newMessage);

        // Emit notification
        io.to(data.receiverId).emit("notification", {
          title: "New Message",
          body: data.message,
          sender: data.senderId
        });
      } catch (err) {
        console.error("Message error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = chatSocket;
