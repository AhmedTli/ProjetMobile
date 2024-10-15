const Produit = require("../models/prodModel.js"); 

// Create and Save a new Product
exports.create = (req, res) => {
  const produit = new Produit({
    nom: req.body.nom,
    description: req.body.description,
    prix: req.body.prix,
  });

  produit
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve all products from the database.
exports.findAll = (req, res) => {
  Produit.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products.",
      });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
  Produit.findById(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with id " + req.params.productId,
      });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  Produit.findByIdAndUpdate(
    req.params.productId,
    {
      nom: req.body.nom,
      description: req.body.description,
      prix: req.body.prix,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Error updating product with id " + req.params.productId,
      });
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  Produit.findByIdAndRemove(req.params.productId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      res.send({ message: "Product deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Product not found with id " + req.params.productId,
        });
      }
      return res.status(500).send({
        message: "Could not delete product with id " + req.params.productId,
      });
    });
};
