const express = require("express");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const BloodRequest = require("../models/BloodRequest");
const Inventory = require("../models/Inventory");

const router = express.Router();

/**
 * 🔹 Create blood request (Donor - logged in)
 * POST /api/requests
 */
router.post("/", protect, async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    const request = await BloodRequest.create({
      requester: req.user.id,
      bloodGroup,
      units,
      status: "Pending",
    });

    res.status(201).json({ message: "Blood request submitted", request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * 🔹 Get all requests (Admin)
 * GET /api/requests
 */
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .sort({ createdAt: -1 })
      .populate("requester", "name email");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * 🔹 INTERNAL FUNCTION: Approve/Reject logic
 */
async function updateRequestStatus(req, res, newStatus) {
  try {
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // If already processed, avoid double update
    if (request.status !== "Pending") {
      return res.status(400).json({
        message: `Request already ${request.status}`,
      });
    }

    // If approving -> reduce inventory
    if (newStatus === "Approved") {
      const stock = await Inventory.findOne({ bloodGroup: request.bloodGroup });

      if (!stock || stock.units < request.units) {
        return res.status(400).json({ message: "Insufficient blood stock" });
      }

      stock.units -= request.units;
      await stock.save();
    }

    request.status = newStatus;
    await request.save();

    res.json({ message: `Request ${newStatus}`, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * ✅ NEW: Approve request (Admin)
 * PUT /api/requests/:id/approve
 */
router.put("/:id/approve", protect, isAdmin, async (req, res) => {
  return updateRequestStatus(req, res, "Approved");
});

/**
 * ✅ NEW: Reject request (Admin)
 * PUT /api/requests/:id/reject
 */
router.put("/:id/reject", protect, isAdmin, async (req, res) => {
  return updateRequestStatus(req, res, "Rejected");
});

/**
 * 🔹 OLD route kept (Admin: update status using body)
 * PUT /api/requests/:id
 * body: { status: "Approved" | "Rejected" | "Pending" }
 */
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    return updateRequestStatus(req, res, status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
