const express = require("express");
const {
  getAllBranches,
  getBranchById,
  createBranch,
  deleteBranch,
  updateBranch,
} = require("../controllers/branchController");
const router = express.Router();

router.get("/", getAllBranches); // Liste de toutes les branches
router.get("/:id", getBranchById); // Détails d'une branche par ID
router.post("/", createBranch); // Création d'une nouvelle branche
router.put("/:id", updateBranch); // Détails d'une branche par ID
router.delete("/:id", deleteBranch); // Suppression d'une nouvelle branche

module.exports = router;
