const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback");

// POST /api/feedback
router.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();
    res.status(200).json({ message: "Thank you for your feedback!" });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Server error while saving feedback" });
  }
});

module.exports = router;
