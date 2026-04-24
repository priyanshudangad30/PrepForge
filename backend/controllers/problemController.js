const Problem = require("../models/Problem");

// @desc    Get all problems (with optional filters)
// @route   GET /api/problems
const getProblems = async (req, res) => {
  try {
    const { difficulty, category, search } = req.query;
    const filter = {};

    if (difficulty && difficulty !== "All") {
      filter.difficulty = difficulty;
    }
    if (category && category !== "All") {
      filter.category = category;
    }
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const problems = await Problem.find(filter)
      .select("title slug difficulty category acceptance totalSubmissions")
      .sort({ createdAt: 1 });

    res.json(problems);
  } catch (error) {
    console.error("Get problems error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get single problem by slug
// @route   GET /api/problems/:slug
const getProblemBySlug = async (req, res) => {
  try {
    const problem = await Problem.findOne({ slug: req.params.slug });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    res.json(problem);
  } catch (error) {
    console.error("Get problem error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all distinct categories
// @route   GET /api/problems/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Problem.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProblems, getProblemBySlug, getCategories };
