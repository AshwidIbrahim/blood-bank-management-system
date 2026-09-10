const express = require("express");
const router = express.Router();
const BloodRequest = require("../models/BloodRequest");

// ✅ Track Public Request using RequestId + Phone
router.post("/", async (req, res) => {
  try {
    const { requestId, phone } = req.body;

    if (!requestId || !phone) {
      return res.status(400).json({ message: "Request ID and Phone are required" });
    }

    const request = await BloodRequest.findOne({
      _id: requestId,
      phone: phone,
      requestType: "PUBLIC",
    });

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({
      requestId: request._id,
      requesterName: request.requesterName,
      phone: request.phone,
      city: request.city,
      hospitalName: request.hospitalName,
      bloodGroup: request.bloodGroup,
      units: request.units,
      urgency: request.urgency,
      status: request.status,
      createdAt: request.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
