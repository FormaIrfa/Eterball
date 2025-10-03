// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true }, // prénom
    surname: { type: String, required: true, trim: true }, // nom
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true }, // nouvelle propriété
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
