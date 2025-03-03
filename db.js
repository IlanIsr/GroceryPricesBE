const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplacez par votre utilisateur MySQL
    password: '', // Remplacez par votre mot de passe MySQL
    database: 'grocery_prices_db', // Remplacez par le nom de votre base
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        process.exit(1); // Arrête le serveur en cas d'erreur
    }
    console.log('Connecté à la base de données MySQL.');
});

module.exports = db;
