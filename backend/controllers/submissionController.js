const Submission = require("../models/Submission");
const Problem = require("../models/Problem");
const User = require("../models/User");

// @desc    Create a new submission
// @route   POST /api/submissions
const createSubmission = async (req, res) => {
  try {
    const { problemId, code, language, status, runtime, memory, output } = req.body;

    // If anonymous user, just return success without saving to DB
    if (!req.user) {
      return res.status(201).json({
        problemId,
        code,
        language,
        status,
        runtime: runtime || "N/A",
        memory: memory || "N/A",
        output: output || "",
      });
    }

    const submission = await Submission.create({
      userId: req.user._id,
      problemId,
      code,
      language,
      status,
      runtime: runtime || "N/A",
      memory: memory || "N/A",
      output: output || "",
    });

    // Update problem stats
    await Problem.findByIdAndUpdate(problemId, {
      $inc: {
        totalSubmissions: 1,
        ...(status === "Accepted" ? { acceptedSubmissions: 1 } : {}),
      },
    });

    // If accepted, update problem acceptance rate and add to user's solved list
    if (status === "Accepted") {
      const problem = await Problem.findById(problemId);
      if (problem) {
        problem.acceptance = Math.round(
          (problem.acceptedSubmissions / problem.totalSubmissions) * 100
        );
        await problem.save();
      }

      // Add to user's solved problems if not already there
      const user = await User.findById(req.user._id);
      if (!user.solvedProblems.includes(problemId)) {
        user.solvedProblems.push(problemId);
      }

      // Update streak
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastSolved = user.streak.lastSolvedDate
        ? new Date(user.streak.lastSolvedDate)
        : null;

      if (lastSolved) {
        lastSolved.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today - lastSolved) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive day
          user.streak.current += 1;
        } else if (diffDays > 1) {
          // Streak broken
          user.streak.current = 1;
        }
        // Same day — no change to streak count
      } else {
        // First ever solve
        user.streak.current = 1;
      }

      user.streak.lastSolvedDate = new Date();
      user.streak.max = Math.max(user.streak.max, user.streak.current);
      await user.save();
    }

    res.status(201).json(submission);
  } catch (error) {
    console.error("Create submission error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get submissions for a specific problem by current user
// @route   GET /api/submissions/problem/:problemId
const getSubmissionsByProblem = async (req, res) => {
  try {
    const submissions = await Submission.find({
      userId: req.user._id,
      problemId: req.params.problemId,
    }).sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error("Get submissions error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all submissions by current user
// @route   GET /api/submissions/me
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user._id })
      .populate("problemId", "title slug difficulty")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(submissions);
  } catch (error) {
    console.error("Get my submissions error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createSubmission, getSubmissionsByProblem, getMySubmissions };
