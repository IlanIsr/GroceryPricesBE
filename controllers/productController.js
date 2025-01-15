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

const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, code } = req.body;

  db.query(
    "UPDATE products SET name = ?, code = ? WHERE id = ?",
    [name, code, productId],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).json({ error: "Erreur du serveur." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Product introuvable." });
      }

      res.status(200).json({
        message: "Product mise à jour avec succès.",
        updatedBranch: {
          id: productId,
          name,
          code,
        },
      });
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
  updateProduct,
  deleteProduct,
};
