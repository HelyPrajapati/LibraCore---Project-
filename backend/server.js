const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//user Routes
app.use('/api', require('./routes/auth'));

// feedback route 
const feedbackRoute = require("./routes/feedback");
app.use("/api", feedbackRoute);

//manage students Route
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

//issue book 
const issueRoutes = require('./routes/issue');
app.use('/api', issueRoutes);

// return book Route 
const returnBookRoutes = require("./routes/returnbook");
app.use("/api/returnbook", returnBookRoutes);

//fines tracker
const fineRoutes = require("./routes/fines");
app.use("/api/fines", fineRoutes);

// MongoDB Connection
console.log("Loaded MONGO_URI:", process.env.MONGO_URI); 
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/LibraCore' , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});