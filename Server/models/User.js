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
    // solde du joueur
    balance: { type: Number, default: 1000, min: 0 }, // ex : 1000 pièces au départ

    // inventaire du joueur (IDs d’items)
    inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
