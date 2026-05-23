const express = require("express");

const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("customer"),
  async (req, res) => {
    try {
      const { items, address, phone } = req.body;

      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ message: "Order must contain at least one item" });
      }

      let totalAmount = 0;
      const orderItems = [];

      for (const item of items) {
        const pizza = await Pizza.findById(item.pizzaId);
        if (!pizza) {
          return res
            .status(404)
            .json({ message: `Pizza with ID ${item.pizzaId} not found` });
        }

        const quantity = item.quantity || 1;
        totalAmount += pizza.price * quantity;
        orderItems.push({
          pizza: pizza._id,
          name: pizza.name,
          price: pizza.price,
          quantity,
        });
      }

      const order = await Order.create({
        user: req.user.id,
        items: orderItems,
        totalAmount,
        address,
        phone,
      });

      res.status(201).json({
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  },
);

router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware("customer"),
  async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.id }).sort({
        createdAt: -1,
      });
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  },
);

router.get("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
});

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { status } = req.body;
      const allowedStatuses = [
        "Pending",
        "Preparing",
        "Out for Delivery",
        "Delivered",
      ];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true },
      );

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({ message: "Order status updated successfully", order });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: error.message || "Server error" });
    }
  },
);

// give sample data for order creation
// {
//   "items": [
//     {
//       "pizzaId": "64a1f8c2e4b0c5a1d2f3e4b",
//       "quantity": 2
//     },
//     {
//       "pizzaId": "64a1f8c2e4b0c5a1d2f3e4c",
//       "quantity": 1
//     }
//   ],
//   "address": "123 Main St, Anytown, USA",
//   "phone": "555-123-4567"
// }

module.exports = router;
