const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");

// ✅ Public (No Login) Blood Request
router.post("/request", async (req, res) => {
  try {
    const {
      requesterName,
      requesterPhone,
      requesterCity,
      hospitalName,
      bloodGroup,
      units,
      urgency,
    } = req.body;

    // Basic validation
    if (
      !requesterName ||
      !requesterPhone ||
      !requesterCity ||
      !bloodGroup ||
      !units
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newRequest = await BloodRequest.create({
      requester: null,
      requestType: "PUBLIC",

      requesterName,
      phone: requesterPhone,
      city: requesterCity,
      hospitalName,

      bloodGroup,
      units,
      urgency: urgency || "Emergency",
    });

    res.status(201).json({
      message: "Blood request submitted successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
