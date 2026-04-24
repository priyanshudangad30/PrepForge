const User = require("../models/User");
const Submission = require("../models/Submission");
const Problem = require("../models/Problem");

// @desc    Get dashboard stats for current user
// @route   GET /api/progress/dashboard
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    // Total problems count
    const totalProblems = await Problem.countDocuments();

    // Solved problems by difficulty
    const solvedProblemIds = user.solvedProblems;
    const solvedProblems = await Problem.find({
      _id: { $in: solvedProblemIds },
    });

    const difficultyBreakdown = {
      Easy: { solved: 0, total: 0 },
      Medium: { solved: 0, total: 0 },
      Hard: { solved: 0, total: 0 },
    };

    // Get total per difficulty
    const allProblems = await Problem.find();
    allProblems.forEach((p) => {
      difficultyBreakdown[p.difficulty].total += 1;
    });

    solvedProblems.forEach((p) => {
      difficultyBreakdown[p.difficulty].solved += 1;
    });

    // Category breakdown
    const categoryBreakdown = {};
    allProblems.forEach((p) => {
      if (!categoryBreakdown[p.category]) {
        categoryBreakdown[p.category] = { solved: 0, total: 0 };
      }
      categoryBreakdown[p.category].total += 1;
    });
    solvedProblems.forEach((p) => {
      if (categoryBreakdown[p.category]) {
        categoryBreakdown[p.category].solved += 1;
      }
    });

    // Recent submissions
    const recentSubmissions = await Submission.find({ userId: req.user._id })
      .populate("problemId", "title slug difficulty")
      .sort({ createdAt: -1 })
      .limit(10);

    // Activity data (last 180 days) — for heatmap
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 180);

    const activityData = await Submission.aggregate([
      {
        $match: {
          userId: user._id,
          createdAt: { $gte: sixMonthsAgo },
          status: "Accepted",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Check if streak needs reset
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (user.streak.lastSolvedDate) {
      const lastSolved = new Date(user.streak.lastSolvedDate);
      lastSolved.setHours(0, 0, 0, 0);
      const diffDays = Math.floor(
        (today - lastSolved) / (1000 * 60 * 60 * 24)
      );
      if (diffDays > 1) {
        user.streak.current = 0;
        await user.save();
      }
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      stats: {
        totalSolved: solvedProblemIds.length,
        totalProblems,
        streak: user.streak,
        difficultyBreakdown,
        categoryBreakdown,
      },
      recentSubmissions,
      activityData,
    });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboard };
