const db = require("../db"); // Connexion à la base MySQL

const getAllNeighborhoods = (req, res) => {
    db.query("SELECT * FROM neighborhood ORDER BY name", (err, results) => {
        if (err) {
            res.status(500).send("Erreur du serveur");
            return;
        }
        res.json(results);
    });
};

const getNeighborhoodById = (req, res) => {
    const neighborhoodId = req.params.id;
    db.query(
        "SELECT * FROM neighborhood WHERE id = ?",
        [neighborhoodId],
        (err, results) => {
            if (err) {
                res.status(500).send("Erreur du serveur");
                return;
            }
            
            if (results.length === 0) {
                res.status(404).send("Quartier non trouvé");
                return;
            }
            
            res.json(results[0]);
        }
    );
};

const createNeighborhood = (req, res) => {
    const { name } = req.body;

    // Validation des données
    if (!name) {
        return res.status(400).json({
            error: "Le champ 'name' est obligatoire."
        });
    }

    // Insertion dans la base
    db.query(
        "INSERT INTO neighborhood (name) VALUES (?)",
        [name],
        (err, results) => {
            if (err) {
                console.error("Erreur lors de l'insertion :", err);
                return res.status(500).json({ error: "Erreur du serveur." });
            }

            res.status(201).json({
                id: results.insertId,
                name
            });
        }
    );
};

const updateNeighborhood = (req, res) => {
    const neighborhoodId = req.params.id;
    const { name } = req.body;

    // Validation des données
    if (!name) {
        return res.status(400).json({
            error: "Le champ 'name' est obligatoire."
        });
    }

    // Requête SQL pour mettre à jour le quartier
    db.query(
        "UPDATE neighborhood SET name = ? WHERE id = ?",
        [name, neighborhoodId],
        (err, results) => {
            if (err) {
                console.error("Erreur lors de la mise à jour :", err);
                return res.status(500).json({ error: "Erreur du serveur." });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Quartier introuvable." });
            }

            res.status(200).json({
                message: "Quartier mis à jour avec succès.",
                updatedNeighborhood: {
                    id: neighborhoodId,
                    name
                }
            });
        }
    );
};

const deleteNeighborhood = (req, res) => {
    const neighborhoodId = req.params.id;
    db.query(
        "DELETE FROM neighborhood WHERE id = ?",
        [neighborhoodId],
        (err, results) => {
            if (err) {
                res.status(500).send("Erreur du serveur");
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).send("Quartier non trouvé");
                return;
            }

            res.status(204).send();
        }
    );
};

module.exports = {
    getAllNeighborhoods,
    getNeighborhoodById,
    createNeighborhood,
    updateNeighborhood,
    deleteNeighborhood
};
