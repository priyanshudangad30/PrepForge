const express = require("express");
const router = express.Router();
const {
  getProblems,
  getProblemBySlug,
  getCategories,
} = require("../controllers/problemController");

router.get("/categories", getCategories);
router.get("/:slug", getProblemBySlug);
router.get("/", getProblems);

module.exports = router;
