const mongoose = require("mongoose");

const fineSchema = new mongoose.Schema({
  studentName: String,
  bookTitle: String,
  dueDate: String,
  fineAmount: Number,
  status: String, // "paid" or "due"
});

module.exports = mongoose.model("Fine", fineSchema);
