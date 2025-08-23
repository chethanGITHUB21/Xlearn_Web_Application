// Import packages
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allow frontend to connect
app.use(express.json());

let users = []; // store all registered users

// API: Register new user
app.post("/register", (req, res) => {
  const { name, dob, email, password, confirmPassword } = req.body;

  // Age calculation
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Generate 5-digit random registration number
  const regNumber = Math.floor(10000 + Math.random() * 90000);

  // Store user (without storing actual DOB for privacy)
  const user = {
    name,
    age,
    email,
    password,
    confirmPassword,
    regNumber,
  };

  users.push(user);

  res.json({ success: true, message: "User registered!", user });
});

// API: Get all registered users
app.get("/users", (req, res) => {
  res.json(users);
});

// Run server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
