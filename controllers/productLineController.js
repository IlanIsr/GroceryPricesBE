const db = require("../db"); // Connexion à la base MySQL

const getAllProductLines = (req, res) => {
  db.query("SELECT * FROM product_lines", (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      res.status(500).send("Erreur du serveur");
      return;
    }
    res.json(results);
  });
};

const getProductLineById = (req, res) => {
  const productLineId = req.params.id;
  db.query(
    "SELECT * FROM product_lines WHERE id = ?",
    [productLineId],
    (err, results) => {
      if (err) {
        console.error("Erreur SQL :", err);
        res.status(500).send("Erreur du serveur");
        return;
      }
      if (results.length === 0) {
        res.status(404).send("Product line non trouvée");
        return;
      }
      res.json(results[0]);
    }
  );
};

const createProductLine = (req, res) => {
  const { product_id, branch_id, price } = req.body;

  // Validation des données
  if (!product_id || !branch_id || typeof price !== "number" || price <= 0) {
    return res.status(400).json({
      error:
        "Les champs 'product_id', 'branch_id' et 'price' sont obligatoires et doivent être valides.",
    });
  }

  db.query(
    "INSERT INTO product_lines (product_id, branch_id, price) VALUES (?, ?, ?)",
    [product_id, branch_id, price],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion :", err);
        return res.status(500).json({ error: "Erreur du serveur." });
      }
      res.json({ id: results.insertId, product_id, branch_id, price });
    }
  );
};

const updateProductLine = (req, res) => {
  const productLineId = req.params.id; // ID de la product line à mettre à jour
  const { product_id, branch_id, price } = req.body;

  // Validation des données
  if (!product_id || !branch_id || !price) {
    return res.status(400).json({
      error:
        "Les champs 'product_id', 'branch_id', et 'price' sont obligatoires.",
    });
  }

  // Requête SQL pour mettre à jour la branche
  db.query(
    "UPDATE product_lines SET product_id = ?, branch_id = ?, price = ? WHERE id = ?",
    [product_id, branch_id, parseFloat(price), productLineId],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).json({ error: "Erreur du serveur." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Product line introuvable." });
      }

      res.status(200).json({
        message: "Product line mise à jour avec succès.",
        updatedProductLine: {
          id: productLineId,
          product_id,
          branch_id,
          price,
        },
      });
    }
  );
};

const deleteProductLine = (req, res) => {
  const productLineId = req.params.id;
  db.query(
    "DELETE FROM product_lines WHERE id = ?",
    [productLineId],
    (err, results) => {
      if (err) {
        console.error("Erreur SQL :", err);
        res.status(500).send("Erreur du serveur");
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).send("Product line non trouvée");
        return;
      }

      res.status(204).send(); // Suppression réussie
    }
  );
};

module.exports = {
  getAllProductLines,
  getProductLineById,
  createProductLine,
  deleteProductLine,
  updateProductLine,
};
