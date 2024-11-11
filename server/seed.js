// seed.js
const sequelize = require("./database");
const Category = require("./models/category");
const Product = require("./models/product");

const seedData = async () => {
  await sequelize.sync({ force: true });

  // Seed categories
  const categories = await Category.bulkCreate([
    { name: "Fruits" },
    { name: "Vegetables" },
    { name: "Dairy" },
    { name: "Beverages" },
    { name: "Snacks" },
    { name: "Grains" },
    { name: "Frozen Foods" },
  ]);

  // Seed products
  await Product.bulkCreate([
    {
      name: "Apple",
      price: 0.5,
      description: "Fresh red apple",
      stock: 100,
      categoryId: categories[0].id,
    },
    {
      name: "Banana",
      price: 0.3,
      description: "Fresh yellow banana",
      stock: 150,
      categoryId: categories[0].id,
    },
    {
      name: "Carrot",
      price: 0.2,
      description: "Organic carrot",
      stock: 200,
      categoryId: categories[1].id,
    },
    {
      name: "Milk",
      price: 1.2,
      description: "1L Full cream milk",
      stock: 50,
      categoryId: categories[2].id,
    },
    {
      name: "Soda",
      price: 1.5,
      description: "Refreshing soda drink",
      stock: 75,
      categoryId: categories[3].id,
    },
    {
      name: "Chips",
      price: 2.0,
      description: "Crunchy potato chips",
      stock: 100,
      categoryId: categories[4].id,
    },
    {
      name: "Orange",
      price: 0.6,
      description: "Sweet orange",
      stock: 80,
      categoryId: categories[0].id,
    },
    {
      name: "Potato",
      price: 0.4,
      description: "Fresh potatoes",
      stock: 120,
      categoryId: categories[1].id,
    },
    {
      name: "Yogurt",
      price: 0.9,
      description: "Creamy yogurt",
      stock: 60,
      categoryId: categories[2].id,
    },
    {
      name: "Juice",
      price: 3.0,
      description: "Natural fruit juice",
      stock: 40,
      categoryId: categories[3].id,
    },
    {
      name: "Cookies",
      price: 2.5,
      description: "Delicious cookies",
      stock: 150,
      categoryId: categories[4].id,
    },
    {
      name: "Rice",
      price: 1.5,
      description: "1 kg bag of rice",
      stock: 90,
      categoryId: categories[5].id,
    },
    {
      name: "Frozen Peas",
      price: 2.2,
      description: "Frozen green peas",
      stock: 70,
      categoryId: categories[6].id,
    },
    {
      name: "Grapes",
      price: 2.0,
      description: "Fresh grapes",
      stock: 60,
      categoryId: categories[0].id,
    },
    {
      name: "Tomato",
      price: 0.5,
      description: "Fresh tomatoes",
      stock: 110,
      categoryId: categories[1].id,
    },
    {
      name: "Butter",
      price: 2.5,
      description: "Salted butter",
      stock: 40,
      categoryId: categories[2].id,
    },
    {
      name: "Tea",
      price: 2.0,
      description: "Black tea",
      stock: 80,
      categoryId: categories[3].id,
    },
    {
      name: "Nuts",
      price: 4.0,
      description: "Mixed nuts",
      stock: 30,
      categoryId: categories[4].id,
    },
    {
      name: "Quinoa",
      price: 3.5,
      description: "Organic quinoa",
      stock: 50,
      categoryId: categories[5].id,
    },
    {
      name: "Ice Cream",
      price: 4.5,
      description: "Vanilla ice cream",
      stock: 20,
      categoryId: categories[6].id,
    },
  ]);

  console.log("Database synced and data seeded");
  process.exit();
};

seedData();
