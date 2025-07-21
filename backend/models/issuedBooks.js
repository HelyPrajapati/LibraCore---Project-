const mongoose = require('mongoose');

const issuedBooksSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  bookId: { type: String, required: true },
  bookTitle: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  department: { type: String },
  status: { type: String, default: "issued" }
});

module.exports = mongoose.model('issuedBooks', issuedBooksSchema);
