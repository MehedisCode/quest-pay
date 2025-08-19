const express = require("express");
const router = express.Router({ mergeParams: true });
const Reply = require("../models/Reply");
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/questions/:id/replies — get all replies for a question
router.get("/", async (req, res) => {
  try {
    const replies = await Reply.find({ question: req.params.id })
      .populate("user", "username")
      .sort({ createdAt: 1 }); // oldest first
    res.json(replies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch replies" });
  }
});

// POST /api/questions/:id/replies — add a reply to a question
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { body } = req.body;
    if (!body) return res.status(400).json({ error: "Reply body is required" });

    // Check if question exists
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const reply = new Reply({
      question: req.params.id,
      user: req.user.userId,
      body,
    });

    await reply.save();
    await reply.populate("user", "username");
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: "Failed to post reply" });
  }
});

module.exports = router;
