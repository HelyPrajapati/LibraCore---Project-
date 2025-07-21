const express = require("express");
const router = express.Router();
const Issue = require("../models/issuedBooks");
const Fine = require("../models/fine"); // ✅ Added

// GET issue details
router.get("/", async (req, res) => {
  const { studentId, bookId } = req.query;

  try {
    const record = await Issue.findOne({ studentId, bookId });
    if (!record) return res.status(404).json({ error: "Issue record not found" });

    res.json({
      issueDate: record.issueDate,
      dueDate: record.dueDate // Send due date too
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST to return book + create fine if needed
router.post("/", async (req, res) => {
  const { studentId, bookId, actualReturnDate } = req.body;

  try {
    const record = await Issue.findOne({ studentId, bookId });
    if (!record) return res.status(404).json({ error: "Issue record not found" });

    const returnDate = new Date(actualReturnDate);
    const dueDate = new Date(record.dueDate);

    const lateDays = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
    let fineAmount = 0;

    if (lateDays > 0) {
      fineAmount = lateDays * 5;

      const fine = new Fine({
        studentId: record.studentId,
        studentName: record.studentName || "Unknown",
        bookTitle: record.bookTitle,
        dueDate: record.dueDate,
        returnDate: returnDate,
        fineAmount: fineAmount,
        status: "due"
      });

      await fine.save(); // ✅ Save fine
    }

    // Remove the issue record after return
    await Issue.findOneAndDelete({ studentId, bookId });

    res.json({ message: "Book returned", fineAmount });
  } catch (err) {
    console.error("Return error:", err);
    res.status(500).json({ error: "Failed to process return" });
  }
});

module.exports = router;
