const db = require("../db");

const createGenericController = (tableName, requiredFields) => {
  const getAll = (req, res) => {
    db.query(`SELECT * FROM ${tableName}`, (err, results) => {
      if (err) {
        console.error("Erreur SQL :", err);
        res.status(500).send("Erreur du serveur");
        return;
      }
      res.json(results);
    });
  };

  const getById = (req, res) => {
    const id = req.params.id;
    db.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id],
      (err, results) => {
        if (err) {
          console.error("Erreur SQL :", err);
          res.status(500).send("Erreur du serveur");
          return;
        }
        if (results.length === 0) {
          res.status(404).send(`${tableName} non trouvé`);
          return;
        }
        res.json(results[0]);
      }
    );
  };

  const create = (req, res) => {
    const data = req.body;

    // Validate required fields
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Les champs ${missingFields.join(", ")} sont obligatoires.`
      });
    }

    const fields = Object.keys(data);
    const values = Object.values(data);
    const placeholders = fields.map(() => "?").join(", ");

    db.query(
      `INSERT INTO ${tableName} (${fields.join(", ")}) VALUES (${placeholders})`,
      values,
      (err, results) => {
        if (err) {
          console.error("Erreur lors de l'insertion :", err);
          return res.status(500).json({ error: "Erreur du serveur." });
        }
        res.status(201).json({ id: results.insertId, ...data });
      }
    );
  };

  const update = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    // Validate required fields
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Les champs ${missingFields.join(", ")} sont obligatoires.`
      });
    }

    const setClause = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = [...Object.values(data), id];

    db.query(
      `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
      values,
      (err, results) => {
        if (err) {
          console.error("Erreur lors de la mise à jour :", err);
          return res.status(500).json({ error: "Erreur du serveur." });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: `${tableName} introuvable.` });
        }
        res.status(200).json({
          message: `${tableName} mis à jour avec succès.`,
          updated: { id, ...data }
        });
      }
    );
  };

  const delete_ = (req, res) => {
    const id = req.params.id;
    db.query(
      `DELETE FROM ${tableName} WHERE id = ?`,
      [id],
      (err, results) => {
        if (err) {
          console.error("Erreur SQL :", err);
          res.status(500).send("Erreur du serveur");
          return;
        }
        if (results.affectedRows === 0) {
          res.status(404).send(`${tableName} non trouvé`);
          return;
        }
        res.status(204).send();
      }
    );
  };

  return {
    getAll,
    getById,
    create,
    update,
    delete: delete_
  };
};

module.exports = createGenericController; 
