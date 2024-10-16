const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
   {
    nom : String,
    description : String,
    prix : Number,
    images : [String],
   }
);

module.exports = mongoose.model("Produit", AppSchema);