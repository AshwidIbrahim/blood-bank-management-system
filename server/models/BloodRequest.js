const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    // ✅ Donor request (logged in)
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ✅ Public Request (no login)
    requesterName: { type: String },
    phone: { type: String },
    city: { type: String },
    hospitalName: { type: String },

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    units: {
      type: Number,
      required: true,
      min: 1,
    },

    urgency: {
      type: String,
      enum: ["Emergency", "Normal"],
      default: "Normal",
    },

    requestType: {
      type: String,
      enum: ["DONOR", "PUBLIC"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
