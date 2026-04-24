const express = require("express");
const router = express.Router();
const { protect, optionalAuth } = require("../middleware/auth");
const {
  createSubmission,
  getSubmissionsByProblem,
  getMySubmissions,
} = require("../controllers/submissionController");

router.post("/", optionalAuth, createSubmission);
router.get("/me", protect, getMySubmissions);
router.get("/problem/:problemId", protect, getSubmissionsByProblem);

module.exports = router;
