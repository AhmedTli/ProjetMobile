const Commande = require("../models/commandeModel.js");

// Create and Save a new Commande
exports.create = (req, res) => {
  const commande = new Commande({
    date: req.body.date || Date.now(), 
    client: req.body.client,
    produits: req.body.produits, 
  });

  commande
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Commande.",
      });
    });
};

// Retrieve all commandes from the database.
exports.findAll = (req, res) => {
  Commande.find().populate('produits.prod')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving commandes.",
      });
    });
};

// Find a single commande with a commandeId
exports.findOne = (req, res) => {
  Commande.findById(req.params.commandeId).populate('produits.prod')
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Commande not found with id " + req.params.commandeId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Commande not found with id " + req.params.commandeId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving commande with id " + req.params.commandeId,
      });
    });
};

// Update a commande identified by the commandeId in the request
exports.update = (req, res) => {
  Commande.findByIdAndUpdate(
    req.params.commandeId,
    {
      date: req.body.date, // Met à jour la date si fournie
      client: req.body.client,
      produits: req.body.produits,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Commande not found with id " + req.params.commandeId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Commande not found with id " + req.params.commandeId,
        });
      }
      return res.status(500).send({
        message: "Error updating commande with id " + req.params.commandeId,
      });
    });
};

// Delete a commande with the specified commandeId in the request
exports.delete = (req, res) => {
  Commande.findByIdAndRemove(req.params.commandeId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Commande not found with id " + req.params.commandeId,
        });
      }
      res.send({ message: "Commande deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Commande not found with id " + req.params.commandeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete commande with id " + req.params.commandeId,
      });
    });
};
