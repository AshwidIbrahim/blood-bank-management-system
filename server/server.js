const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const requestRoutes = require("./routes/requestRoutes");
const publicRequestRoutes = require("./routes/publicRequestRoutes");
const trackRoutes = require("./routes/trackRoutes");



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/public", publicRequestRoutes);
app.use("/api/track", trackRoutes);





// Test route
app.get("/", (req, res) => {
  res.send("Blood Bank API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
