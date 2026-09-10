import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const trackPublicRequest = (data) => API.post("/track", data);
export const getInventory = (token) =>
  API.get("/inventory", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRequests = (token) =>
  API.get("/requests", {
    headers: { Authorization: `Bearer ${token}` },
  });
// ✅ DONOR PROFILE (DONOR)
export const getDonorProfile = (token) =>
  API.get("/donors/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateDonorProfile = (data, token) =>
  API.put("/donors/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
