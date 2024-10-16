module.exports = (app) => {
    const Commande = require("../controllers/commandeController.js");
  
    app.post("/create-commande", Commande.create);
    
    app.get("/get-commandes", Commande.findAll);
    
    app.get("/commande/:commandeId", Commande.findOne);
    
    app.put("/commande/:commandeId", Commande.update);
    
    app.delete("/commande/:commandeId", Commande.delete);
  };
  