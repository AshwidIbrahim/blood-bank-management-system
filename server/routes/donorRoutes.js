const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

/* ==========================
   ADMIN: Get all donors
   GET /api/donors
========================== */
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" }).select("-password");
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==========================
   DONOR: Get own profile ✅ NEW
   GET /api/donors/profile
========================== */
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==========================
   DONOR: Update own profile
   PUT /api/donors/profile
========================== */
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
    user.city = req.body.city || user.city;
    user.lastDonationDate = req.body.lastDonationDate || user.lastDonationDate;

    user.isAvailable =
      req.body.isAvailable !== undefined ? req.body.isAvailable : user.isAvailable;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bloodGroup: user.bloodGroup,
        city: user.city,
        lastDonationDate: user.lastDonationDate,
        isAvailable: user.isAvailable,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
