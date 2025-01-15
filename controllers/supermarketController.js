const db = require("../db"); // Connexion à la base MySQL

const getAllSupermarkets = (req, res) => {
  db.query("SELECT * FROM supermarket", (err, results) => {
    if (err) {
      res.status(500).send("Erreur du serveur");
      return;
    }
    res.json(results);
  });
};

const getSupermarketById = (req, res) => {
  const supermarketId = req.params.id;
  db.query(
    "SELECT * FROM supermarket WHERE id = ?",
    [supermarketId],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur du serveur");
        return;
      }
      res.json(results[0]);
    }
  );
};

const createSupermarket = (req, res) => {
  const { name } = req.body;

  // Validation des données
  if (!name) {
    return res.status(400).json({
      error:
        "Le champ 'name' est obligatoire.",
    });
  }

  // Insertion dans la base
  db.query(
    "INSERT INTO supermarket (name) VALUES (?)",
    [name],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return res.status(500).json({ error: "Erreur du serveur." });
      }

      res.status(201).json({
        id: results.insertId,
        name,
      });
    }
  );
};

const updateSupermarket = (req, res) => {
  const supermarketId = req.params.id; // ID de la branche à mettre à jour
  const { name } = req.body;

  // Validation des données
  if (!name) {
    return res.status(400).json({
      error:
        "Le champ 'name' est obligatoire.",
    });
  }

  // Requête SQL pour mettre à jour la branche
  db.query(
    "UPDATE supermarket SET name = ? WHERE id = ?",
    [name, supermarketId],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).json({ error: "Erreur du serveur." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Supermarket introuvable." });
      }

      res.status(200).json({
        message: "Supermarket mis à jour avec succès.",
        updatedSupermarket: {
          id: supermarketId,
          name,
        },
      });
    }
  );
};

const deleteSupermarket = (req, res) => {
  const supermarketId = req.params.id;
  db.query("DELETE FROM supermarket WHERE id = ?", [supermarketId], (err, results) => {
    if (err) {
      res.status(500).send("Erreur du serveur");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("Supermarket non trouvée");
      return;
    }

    res.status(204).send();
  });
};

module.exports = {
  getAllSupermarkets,
  getSupermarketById,
  createSupermarket,
  updateSupermarket,
  deleteSupermarket,
};
