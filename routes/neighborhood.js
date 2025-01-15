const express = require("express");
const {
  getAllNeighborhoods,
  getNeighborhoodById,
  createNeighborhood,
  updateNeighborhood,
  deleteNeighborhood
} = require("../controllers/neighborhoodController");
const router = express.Router();

router.get("/", getAllNeighborhoods); // Liste de tous les quartiers
router.get("/:id", getNeighborhoodById); // Détails d'un quartier par ID
router.post("/", createNeighborhood); // Création d'un nouveau quartier
router.put("/:id", updateNeighborhood); // Mise à jour d'un quartier
router.delete("/:id", deleteNeighborhood); // Suppression d'un quartier

module.exports = router;
