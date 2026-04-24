const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { getDashboard } = require("../controllers/progressController");

router.get("/dashboard", protect, getDashboard);

module.exports = router;
