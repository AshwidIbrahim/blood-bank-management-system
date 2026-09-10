const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const Inventory = require("../models/Inventory");

const router = express.Router();

// 🔹 Get all blood stock
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const stock = await Inventory.find();

    const updatedStock = stock.map((item) => {
      const today = new Date();
      const addedDate = new Date(item.addedDate);
      const diffDays =
        (today - addedDate) / (1000 * 60 * 60 * 24);

      return {
        ...item._doc,
        isExpired: diffDays > 42,
      };
    });

    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔹 Add or update blood stock (Admin)
router.post("/add", protect, isAdmin, async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    let stock = await Inventory.findOne({ bloodGroup });

    if (stock) {
      stock.units += units;
      stock.addedDate = new Date();
      await stock.save();
    } else {
      stock = await Inventory.create({
        bloodGroup,
        units,
      });
    }

    res.json({ message: "Blood stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
