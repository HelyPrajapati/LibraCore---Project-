const express = require("express");
const router = express.Router();
const User = require("../models/users");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await User.find({ role: "Student" });
    res.json(students);
  } catch (err) {
    console.error("Failed to fetch students:", err);
    res.status(500).json({ error: "Server error while fetching students." });
  }
});

// DELETE student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await User.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }
    res.json({ message: "Student deleted successfully." });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error during deletion." });
  }
});

module.exports = router;
