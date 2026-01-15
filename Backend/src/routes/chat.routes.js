const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chat.controller");

// ✅ POST message (THIS fixes Postman 404)
router.post("/send", chatController.sendMessage);

// ✅ GET chat history
router.get("/:userId1/:userId2", chatController.getMessages);

// 🚨 THIS LINE IS CRITICAL
module.exports = router;
