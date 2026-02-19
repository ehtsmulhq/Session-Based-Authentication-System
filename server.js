// Load libraries
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));
  
// Routes
app.get('/', (req, res) => {
  if (req.session.user) res.redirect('/main');
  else res.redirect('/login');
});

// Registration page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.post('/register', async (req, res) => {
  const { phone, username, password, gender, dob } = req.body;
  const userDOB = new Date(dob);
  const age = new Date().getFullYear() - userDOB.getFullYear();

  if (age < 15) {
    return res.json({ success: false, message: ' You must be at least 15 years old to register.' });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.json({ success: false, message: ' Phone number already registered!' });
    }

    const newUser = new User({ phone, username, password, gender, dob });
    await newUser.save();

    return res.json({ success: true, message: ' Registration successful! Redirecting to login...' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: ' Error registering user.' });
  }
});


// Login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone, password });

  if (!user) {
    return res.send(' Invalid phone number or password.');
  }

  req.session.user = user;
  res.redirect('/main');
});

// Main page
app.get('/main', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'main.html'));
});

// Profile page
app.get('/profile', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

// Get user info (for displaying username)
app.get('/userinfo', (req, res) => {
  if (!req.session.user) return res.status(401).send('Unauthorized');
  res.json(req.session.user);
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/login');
  });
});

// Start server
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
);
