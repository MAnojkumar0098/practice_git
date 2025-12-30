const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/product.model");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://manojmanoj49896:manoj888@cluster0.20qgyot.mongodb.net/productsDB"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// CREATE
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// READ BY ID
app.get("/api/products/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  const product = await Product.findById(req.params.id);
  res.status(200).json(product ? [product] : []);
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updated);
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// 🔥 THIS IS MANDATORY
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
