const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  createRevision,
  getRevisions,
  updateRevision,
  deleteRevision,
} = require("../controllers/revisionController");

router.post("/", protect, createRevision);
router.get("/", protect, getRevisions);
router.put("/:id", protect, updateRevision);
router.delete("/:id", protect, deleteRevision);

module.exports = router;
