import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // If not logged in
  if (!token || !user) return <Navigate to="/login" replace />;

  // If logged in but not admin
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}

export default AdminRoute;
