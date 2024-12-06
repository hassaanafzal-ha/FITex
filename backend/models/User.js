const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
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
      lowercase: true, // Automatically converts to lowercase
      match: /.+\@.+\..+/, // Validates email format
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
      enum: ["user", "admin"], // Restricts values to either 'user' or 'admin'
      default: "user",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Export User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
