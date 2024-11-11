// routes/category.js
const express = require("express");
const Category = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send("Category not found.");
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error creating category");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send("Category not found.");

    await category.update(req.body);
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error updating category");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send("Category not found.");

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
