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

module.exports = router;
