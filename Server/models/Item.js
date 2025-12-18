const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // nom de l'article
    details: { type: String, required: true, trim: true }, // description de l'article
    price: { type: Number, required: true, min: 0 }, // prix de l'article
    category: {
      type: [String], // un tableau de chaînes
      required: true, // le champ doit exister
      trim: true, // supprime les espaces au début/fin de chaque élément
      validate: {
        validator: function (arr) {
          return arr.length > 0; // s'assure qu'il y a au moins une catégorie
        },
        message: 'Un article doit avoir au moins une catégorie.',
      },
    },

    imageUrl: { type: String, required: true, trim: true }, // URL de l'image de l'article
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
