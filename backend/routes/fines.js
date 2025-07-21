const express = require("express");
const router = express.Router();
const Fine = require("../models/fine");

// Get all fines
router.get("/", async (req, res) => {
  try {
    const fines = await Fine.find();
    res.json(fines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fines" });
  }
});

module.exports = router;
