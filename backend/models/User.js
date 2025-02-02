const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");  // Import bcrypt

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving the user
userSchema.pre("save", async function(next) {
  // Only hash the password if it has been modified or is a new user
  if (!this.isModified("password")) return next();

  try {
    // Generate a salt for bcrypt (number 10 is the salt rounds, can be adjusted)
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    this.password = await bcrypt.hash(this.password, salt);
    next();  // Proceed with saving the user
  } catch (error) {
    next(error);  // Handle any errors
  }
});

module.exports = mongoose.model("User", userSchema);
