import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import FilmList from "./pages/FilmList";
import FilmDetail from "./pages/FilmDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div style={{ background: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1>🎬 WebStream</h1>

      {/* Navigasi */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px", color: "cyan" }}>Home</Link>
        <Link to="/list" style={{ color: "cyan" }}>List Film</Link>
      </nav>

      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<FilmList />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/about" element={<h2>Website Streaming Sederhana 🚀</h2>} />

        {/* 🔹 fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
