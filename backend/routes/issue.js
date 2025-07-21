const express = require('express');
const router = express.Router();
const IssuedBook = require('../models/issuedBooks');

router.post('/issue', async (req, res) => {
  try {
    console.log("🔍 Incoming Issue Data:", req.body);

    const {
      studentId,
      studentName,
      bookId,
      bookTitle,
      issueDate,
      returnDate,
      department
    } = req.body;

    if (!studentId || !studentName || !bookId || !bookTitle || !issueDate || !returnDate) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const newIssue = new IssuedBook({
      studentId,
      studentName,
      bookId,
      bookTitle,
      issueDate: new Date(issueDate),
      returnDate: new Date(returnDate),
      department
    });

    const result = await newIssue.save();

    console.log("✅ Book issued:", result);
    res.status(201).json({ message: "Book issued successfully!" });

  } catch (error) {
    console.error("❌ Error saving issue:", error.message);
    res.status(500).json({ error: "Server error while issuing book" });
  }
});

module.exports = router;
