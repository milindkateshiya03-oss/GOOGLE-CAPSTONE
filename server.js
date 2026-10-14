// ─────────────────────────────────────
// server.js – Backend Server
// Node.js + Express + MongoDB
// ─────────────────────────────────────

// ── STEP 1: Load required packages ──
const express  = require('express');    // For creating server & routes
const mongoose = require('mongoose');   // For talking to MongoDB
const cors     = require('cors');       // For allowing frontend to connect
const path     = require('path');       // For file paths (built-in Node)
require('dotenv').config();             // Load .env file

// ── STEP 2: Create the Express app ──
const app = express();

// ── STEP 3: Middleware (settings for the server) ──

// Allow frontend (different port) to talk to backend
app.use(cors());

// Tell server to understand JSON data in requests
app.use(express.json());

// Serve the public folder as static files
// So visiting localhost:3000 opens index.html automatically
app.use(express.static(path.join(__dirname, 'public')));

// ── STEP 4: Connect to MongoDB ──
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(() => console.log('❌ MongoDB connection failed. Check your .env file.'));

// ── STEP 5: Define the Data Schema (Blueprint) ──
// This tells MongoDB what shape our data will have
const registrationSchema = new mongoose.Schema({

  name:  {
    type:     String,
    required: true      // This field must exist
  },

  event: {
    type:     String,
    required: true
  },

  // Automatically saves the date & time of registration
  registeredAt: {
    type:    Date,
    default: Date.now
  }

});

// Create a Model from the Schema
// 'Registration' becomes the collection name in MongoDB
const Registration = mongoose.model('Registration', registrationSchema);

// ─────────────────────────────────────
// ── STEP 6: API ROUTES ──
// ─────────────────────────────────────

// Route 1: Test if server is alive
// Visit http://localhost:3000/health
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

// Route 2: Register a student
// POST http://localhost:3000/register
app.post('/register', async (req, res) => {

  try {
    // req.body = data sent from the frontend form
    const { name, event } = req.body;

    // Basic check: if name or event is missing, reject
    if (!name || !event) {
      return res.status(400).json({
        success: false,
        message: 'Name and event are required.'
      });
    }

    // Create a new registration document using our model
    const newEntry = new Registration({
      name:  name,
      event: event
    });

    // Save it to MongoDB (await = wait until saved)
    await newEntry.save();

    // Send success response back to frontend
    res.json({
      success: true,
      message: 'Registration saved!'
    });

  } catch (error) {
    // If anything goes wrong, send error response
    console.error('Error saving registration:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.'
    });
  }

});

// Route 3: View all registrations
// Visit http://localhost:3000/registrations
app.get('/registrations', async (req, res) => {
  try {
    const allData = await Registration.find();  // Get all records from MongoDB
    res.json(allData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data.' });
  }
});

// ── STEP 7: Start the server ──
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📋 View registrations: http://localhost:${PORT}/registrations`);
});
