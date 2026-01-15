const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

// POST /api/auth/register
router.post("/register", register); // pass the function, do NOT call it

// POST /api/auth/login
router.post("/login", login);

module.exports = router;
