import express from "express";
import products from "./data/products.js";

const port = 5001;

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
