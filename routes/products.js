const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getAllProducts); // Liste de tous les produits
router.get("/:id", getProductById); // Détails d'un produit par ID
router.post("/", createProduct); // Création d'un nouveau produit
router.put("/:id", updateProduct); // Détails d'un produit par ID
router.delete("/:id", deleteProduct); // Suppression d'un produit par ID

module.exports = router;
