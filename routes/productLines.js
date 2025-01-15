const express = require("express");
const {
  getAllProductLines,
  getProductLineById,
  createProductLine,
  updateProductLine,
  deleteProductLine,
} = require("../controllers/productLineController");
const router = express.Router();

router.get("/", getAllProductLines); // Liste de tous les produits
router.get("/:id", getProductLineById); // Détails d'un produit par ID
router.post("/", createProductLine); // Création d'un nouveau produit
router.put("/:id", updateProductLine); // Modification d'un produit par ID
router.delete("/:id", deleteProductLine); // Suppression d'un produit par ID

module.exports = router;
