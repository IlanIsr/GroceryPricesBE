const express = require("express");
const {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
} = require("../controllers/products");
const router = express.Router();

router.get("/", getAll); // Liste de tous les produits
router.get("/:id", getById); // Détails d'un produit par ID
router.post("/", create); // Création d'un nouveau produit
router.put("/:id", update); // Détails d'un produit par ID
router.delete("/:id", delete_); // Suppression d'un produit par ID

module.exports = router;
