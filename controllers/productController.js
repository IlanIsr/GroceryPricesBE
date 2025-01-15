const db = require("../db"); // Connexion à la base MySQL

const getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      res.status(500).send("Erreur du serveur");
      return;
    }
    res.json(results);
  });
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  db.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur du serveur");
        return;
      }
      res.json(results[0]);
    }
  );
};

const createProduct = (req, res) => {
  const { name, code } = req.body;

  // Validation des données
  if (!name || !code) {
    return res.status(400).json({
      error: "Les champs 'name' et 'code' sont obligatoires.",
    });
  }

  db.query(
    "INSERT INTO products (name, code) VALUES (?, ?)",
    [name, code],
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur du serveur");
        return res.status(500).json({ error: "Erreur du serveur." });
      }
      res.json({ id: results.insertId, name, code });
    }
  );
};

const deleteProduct = (req, res) => {
  const productId = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", [productId], (err, results) => {
    if (err) {
      res.status(500).send("Erreur du serveur");
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).send("Product non trouvée");
      return;
    }

    res.status(204).send();
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
};
