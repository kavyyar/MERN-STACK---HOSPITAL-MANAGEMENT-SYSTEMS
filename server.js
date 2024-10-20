const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = process.env.PORT || 1001; // Adjust the port if necessary

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the React frontend
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospitalmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define user schema (MongoDB collection: 'details')
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { collection: 'details' });  // Specify collection name 'details'

// Create the User model
const User = mongoose.model('User', userSchema);

// Define appointment schema
const appointmentSchema = new mongoose.Schema({
  doctor: String,
  patient: String,
  time: String,
});

// Create Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Management System API');
});

// Register route
app.post('/register', async (req, res) => {
  const { firstname, lastname, gender, dateOfBirth, phoneNumber, email, password } = req.body;

  // Create a new user instance
  const newUser = new User({
    firstname,
    lastname,
    gender,
    dateOfBirth,
    phoneNumber,
    email,
    password,  // Store plain password (for now, not recommended for production)
  });

  try {
    await newUser.save();  // Save the user to MongoDB
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(400).json({ error: 'User registration failed' });
    }
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
});

// Appointment route
app.post('/appointments', async (req, res) => {
  const { doctor, patient, time } = req.body;

  const newAppointment = new Appointment({ doctor, patient, time });
  try {
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: 'Appointment creation failed' });
  }
});

// Get appointments route
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
