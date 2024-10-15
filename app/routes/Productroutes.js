module.exports = (app) => {
    const Produit = require("../controllers/prodController.js");
  
    app.post("/create-produit", Produit.create);
  
    app.get("/get-products", Produit.findAll);
  
    app.get("/produit/:productId", Produit.findOne);
  
    app.put("/produit/:productId", Produit.update);
  
    app.delete("/produit/:productId", Produit.delete);
  };