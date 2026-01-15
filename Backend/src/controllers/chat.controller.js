const Message = require("../models/message.model");

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, receiverId, message } = req.body;

    const newMessage = await Message.create({
      chatId,
      senderId,
      receiverId,
      message
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    const chatIds = [userId1 + userId2, userId2 + userId1];

    const messages = await Message.find({
      chatId: { $in: chatIds }
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
