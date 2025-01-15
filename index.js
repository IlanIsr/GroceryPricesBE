const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

const branchRoutes = require("./routes/branches");
const productRoutes = require("./routes/products");
const productLineRoutes = require("./routes/productLines");
const neighborhoodRoutes = require("./routes/neighborhood");
const supermarketRoutes = require("./routes/supermarkets");

app.use("/branches", branchRoutes);
app.use("/products", productRoutes);
app.use("/product-lines", productLineRoutes);
app.use("/neighborhoods", neighborhoodRoutes);
app.use("/supermarkets", supermarketRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur backend en écoute sur http://localhost:${port}`);
});
