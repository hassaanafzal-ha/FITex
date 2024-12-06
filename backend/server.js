const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// User Schema and Model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// FitnessPlan Schema
const fitnessPlanSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FitnessPlan = mongoose.model("FitnessPlan", fitnessPlanSchema);

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());











// Routes



// Save Fitness Plan Route
app.post("/api/fitness-plan", async (req, res) => {
  const { email, title } = req.body;

  if (!email || !title) {
    return res.status(400).json({ message: "Email and title are required." });
  }

  try {
    const newPlan = new FitnessPlan({ email, title });
    await newPlan.save();
    res.status(201).json({ message: "Fitness plan saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving fitness plan." });
  }
});

// Sign-Up Route
app.post("/api/signup", async (req, res) => {
  const { name, username, email, password, phoneNumber } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user." });
  }
});

// Example login endpoint in Node.js (Express)
// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Send the user details and message upon successful login
    res.status(200).json({
      message: "Login successful!",
      user: {
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in." });
  }
});



// Server Port
const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
