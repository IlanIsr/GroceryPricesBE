const express = require("express");
const {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
} = require("../controllers/neighborhood");
const router = express.Router();

router.get("/", getAll); // Liste de tous les quartiers
router.get("/:id", getById); // Détails d'un quartier par ID
router.post("/", create); // Création d'un nouveau quartier
router.put("/:id", update); // Mise à jour d'un quartier
router.delete("/:id", delete_); // Suppression d'un quartier

module.exports = router;
