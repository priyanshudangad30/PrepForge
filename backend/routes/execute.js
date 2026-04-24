const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { executeCode } = require("../controllers/executeController");

router.post("/", executeCode);

module.exports = router;
