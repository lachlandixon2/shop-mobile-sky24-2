// routes/products.js
const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({ include: Category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: Category,
    });
    if (!product) return res.status(404).send("Product not found.");
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating product");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send("Product not found.");

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating product");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).send("Product not found.");

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
