const db = require("../db"); // Connexion à la base MySQL

const getAllBranches = (req, res) => {
  db.query("SELECT * FROM branches", (err, results) => {
    if (err) {
      res.status(500).send("Erreur du serveur");
      return;
    }
    res.json(results);
  });
};

const getBranchById = (req, res) => {
  const branchId = req.params.id;
  db.query(
    "SELECT * FROM branches WHERE id = ?",
    [branchId],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur du serveur");
        return;
      }
      res.json(results[0]);
    }
  );
};

const createBranch = (req, res) => {
  const { address, neighborhood_id, supermarket_id } = req.body;

  // Validation des données
  if (!address || !neighborhood_id || !supermarket_id) {
    return res.status(400).json({
      error:
        "Les champs 'address', 'neighborhood_id', et 'supermarket_id' sont obligatoires.",
    });
  }

  // Insertion dans la base
  db.query(
    "INSERT INTO branches (address, neighborhood_id, supermarket_id) VALUES (?, ?, ?)",
    [address, neighborhood_id, supermarket_id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return res.status(500).json({ error: "Erreur du serveur." });
      }

      res.status(201).json({
        id: results.insertId,
        address,
        neighborhood_id,
        supermarket_id,
      });
    }
  );
};

const updateBranch = (req, res) => {
  const branchId = req.params.id; // ID de la branche à mettre à jour
  const { address, neighborhood_id, supermarket_id } = req.body;

  // Validation des données
  if (!address || !neighborhood_id || !supermarket_id) {
    return res.status(400).json({
      error:
        "Les champs 'address', 'neighborhood_id', et 'supermarket_id' sont obligatoires.",
    });
  }

  // Requête SQL pour mettre à jour la branche
  db.query(
    "UPDATE branches SET address = ?, neighborhood_id = ?, supermarket_id = ? WHERE id = ?",
    [address, neighborhood_id, supermarket_id, branchId],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).json({ error: "Erreur du serveur." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Branche introuvable." });
      }

      res.status(200).json({
        message: "Branche mise à jour avec succès.",
        updatedBranch: {
          id: branchId,
          address,
          neighborhood_id,
          supermarket_id,
        },
      });
    }
  );
};

const deleteBranch = (req, res) => {
  const branchId = req.params.id;
  db.query("DELETE FROM branches WHERE id = ?", [branchId], (err, results) => {
    if (err) {
      res.status(500).send("Erreur du serveur");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("Branche non trouvée");
      return;
    }

    res.status(204).send();
  });
};

module.exports = {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
};
