const Revision = require("../models/Revision");

// @desc    Create a revision note
// @route   POST /api/revision
const createRevision = async (req, res) => {
  try {
    const { title, content, tags, problemId } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const revision = await Revision.create({
      userId: req.user._id,
      title,
      content,
      tags: tags || [],
      problemId: problemId || null,
    });

    res.status(201).json(revision);
  } catch (error) {
    console.error("Create revision error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all revision notes for current user
// @route   GET /api/revision
const getRevisions = async (req, res) => {
  try {
    const { search, tag } = req.query;
    const filter = { userId: req.user._id };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (tag) {
      filter.tags = { $in: [tag] };
    }

    const revisions = await Revision.find(filter)
      .populate("problemId", "title slug")
      .sort({ updatedAt: -1 });

    res.json(revisions);
  } catch (error) {
    console.error("Get revisions error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a revision note
// @route   PUT /api/revision/:id
const updateRevision = async (req, res) => {
  try {
    const revision = await Revision.findById(req.params.id);

    if (!revision) {
      return res.status(404).json({ message: "Revision not found" });
    }

    if (revision.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, content, tags } = req.body;
    revision.title = title || revision.title;
    revision.content = content || revision.content;
    revision.tags = tags || revision.tags;

    await revision.save();
    res.json(revision);
  } catch (error) {
    console.error("Update revision error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a revision note
// @route   DELETE /api/revision/:id
const deleteRevision = async (req, res) => {
  try {
    const revision = await Revision.findById(req.params.id);

    if (!revision) {
      return res.status(404).json({ message: "Revision not found" });
    }

    if (revision.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Revision.findByIdAndDelete(req.params.id);
    res.json({ message: "Revision deleted" });
  } catch (error) {
    console.error("Delete revision error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createRevision, getRevisions, updateRevision, deleteRevision };
