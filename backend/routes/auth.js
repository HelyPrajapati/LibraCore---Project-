const express = require('express');
const router = express.Router();
const User = require('../models/users');

//signup route
router.post('/signup', async (req, res) => {
  const { name, email, role, password, studentId, department } = req.body;

  if (!name || !email || !role || !password || !studentId || !department) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const newUser = new User({ name, email, role, password, studentId, department });
    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

//login route
// POST /login
const bcrypt = require('bcrypt');
router.post("/api/login", async (req, res) => {
  const { name, role, password } = req.body;

  try {
    const user = await User.findOne({ name, role });
if (!user || !(await bcrypt.compare(password, user.password))) {
  return res.status(401).send("Invalid credentials");
}

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    if (role === "Admin") {
      return res.status(200).json({ redirect: "/admin_panel.html" });
    } else if (role === "Student") {
      return res.status(200).json({ redirect: "/student_dashboard.html" });
    } else {
      return res.status(400).send("Invalid role selected");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//for manage_students file
router.get("/api/students", async (req, res) => {
  try {
    const students = await users.find({ role: "Student" });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});


module.exports = router;