const express = require("express");
const {
  getAll,
  getById,
  create,
  update,
  delete: delete_,
} = require("../controllers/branches");
const router = express.Router();

router.get("/", getAll); // Liste de toutes les branches
router.get("/:id", getById); // Détails d'une branche par ID
router.post("/", create); // Création d'une nouvelle branche
router.put("/:id", update); // Détails d'une branche par ID
router.delete("/:id", delete_); // Suppression d'une nouvelle branche

module.exports = router;
