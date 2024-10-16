const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
  {
    date: Date,
    client: String,
    produits: [  
      {
      
       prod :{ type : mongoose.Schema.Types.ObjectId, ref: 'Produit' }
      ,
        quantity : Number,
    }
    
    ]
    
  }
);
  
  module.exports = mongoose.model("Commande", AppSchema);