const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { question, body, tags, bounty } = req.body;

    if (!question || !body || bounty == null) {
      return res
        .status(400)
        .json({ error: "Title, body, and bounty are required" });
    }

    if (typeof bounty !== "number" || bounty < 0) {
      return res
        .status(400)
        .json({ error: "Bounty must be a non-negative number" });
    }

    const tagsArray = tags
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    const newQuestion = new Question({
      question,
      body,
      tags: tagsArray,
      bounty,
      owner: req.user.userId,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question submitted successfully" });
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET — fetch all questions with pagination
router.get("/", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = 10;

    let skip = (page - 1) * limit;

    const questions = await Question.find()
      .populate("owner", "username")
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Question.countDocuments();

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalQuestions: total,
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// For Bounty
router.get("/bounties", async (req, res) => {
  try {
    const bountyQuestions = await Question.find({ bounty: { $gt: 0 } })
      .populate("owner", "username")
      .sort({ bounty: -1, timestamp: -1 });
    res.json(bountyQuestions);
  } catch (err) {
    console.error("Error fetching bounties:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get the 3 most recent questions
router.get("/recent", async (req, res) => {
  try {
    const recentQuestions = await Question.find({})
      .sort({ timestamp: -1 })
      .limit(3)
      .select("question _id"); // Include other fields as needed
    res.json(recentQuestions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get single question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "owner",
      "username"
    );

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(question);
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
