const express = require("express");

const Pizza = require("../models/Pizza");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { create } = require("../models/User");

const router = express.Router();

// Get all pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true }).sort({
      createdAt: -1,
    });
    res.json(pizzas);
  } catch (error) {
    console.error("Error fetching pizzas:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: "Pizza not found" });
    }
    res.json(pizza);
  } catch (error) {
    console.error("Error fetching pizza:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new pizza (admin only)
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const pizza = await Pizza.create({
      name,
      description,
      price,
      category,
      image,
    });
    res.status(201).json({
      message: "Pizza created successfully",
      pizza,
    });
  } catch (error) {
    console.error("Error creating pizza:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});

// give sample data for pizza creation
// {
//   "name": "Margherita",
//   "description": "Classic pizza with tomato sauce, mozzarella, and basil.",
//   "price": 9.99,
//   "category": "Vegetarian",
//   "image": "https://example.com/images/margherita.jpg"
// }
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const pizza = await Pizza.findByIdAndDelete(req.params.id);
      if (!pizza) {
        return res.status(404).json({ message: "Pizza not found" });
      }
      res.json({ message: "Pizza deleted successfully" });
    } catch (error) {
      console.error("Error deleting pizza:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  },
);
module.exports = router;
