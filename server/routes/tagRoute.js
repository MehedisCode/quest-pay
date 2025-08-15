const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/all", async (req, res) => {
  try {
    const tagsData = await Question.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const tags = tagsData.map((tag) => ({
      name: tag._id,
      count: tag.count,
    }));
    res.json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:tag", async (req, res) => {
  try {
    const tag = req.params.tag;
    console.log(tag);
    let page = parseInt(req.query.page) || 1;
    let limit = 10;
    let skip = (page - 1) * limit;

    const questions = await Question.find({ tags: tag })
      .populate("owner", "username")
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Question.countDocuments({ tags: tag });

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalQuestions: total,
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions by tag:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
