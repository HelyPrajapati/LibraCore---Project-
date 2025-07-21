
const mongoose = require('mongoose');
const { applyTimestamps } = require('./feedback');

  const userSchema = new mongoose.Schema({
    studentId: {type:String,},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: {type:String,required:true},
    role: { type: String, enum: ['Admin', 'Student'], required: true },
    password: { type: String, required: true },
    submittedAt: { type:Date, default: Date.now}
  });

  module.exports = mongoose.model('users', userSchema);