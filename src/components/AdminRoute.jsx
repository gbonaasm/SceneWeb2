// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user")); // pastikan waktu login kamu simpan { role: "admin" }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
