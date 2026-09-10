import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import RequestBlood from "./pages/RequestBlood";
import TrackRequest from "./pages/TrackRequest";
import About from "./pages/About";
import Contact from "./pages/Contact";




// ✅ Import Protected Routes
import AdminRoute from "./routes/AdminRoutes";
import DonorRoute from "./routes/DonorRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/track-request" element={<TrackRequest />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />


        
        

        {/* ✅ Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/donor"
          element={
            <DonorRoute>
              <DonorDashboard />
            </DonorRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
