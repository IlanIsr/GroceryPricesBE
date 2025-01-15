const express = require("express");
const {
  getAllSupermarkets,
  getSupermarketById,
  createSupermarket,
  updateSupermarket,
  deleteSupermarket,
} = require("../controllers/supermarketController");
const router = express.Router();

router.get("/", getAllSupermarkets); // Liste de toutes les branches
router.get("/:id", getSupermarketById); // Détails d'une branche par ID
router.post("/", createSupermarket); // Création d'une nouvelle branche
router.put("/:id", updateSupermarket); // Détails d'une branche par ID
router.delete("/:id", deleteSupermarket); // Suppression d'une nouvelle branche

module.exports = router;
