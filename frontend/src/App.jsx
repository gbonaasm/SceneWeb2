import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import FilmList from "./pages/FilmList";
import FilmDetail from "./pages/FilmDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminFilmCreate from "./pages/AdminFilmCreate";
import AdminFilmEdit from "./pages/AdminFilmEdit";  

export default function App() {
  return (
    
   <div style={{ background: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
      
      
      {/* Navigasi */}
      <nav style={{ marginBottom: "20px" }}>
      <Navbar />
      </nav>
      {/* Routing */}
      <Routes>
        
        <Route path="/films" element={<FilmList />} />   {/* ✅ route untuk list film */}
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/about" element={<h2>Website Streaming Sederhana 🚀</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/films/create" element={<AdminFilmCreate />} /> {/* Route untuk menambah film */}
        <Route path="/admin/films/edit/:id" element={<AdminFilmEdit />} />   {/* Route untuk edit film */}

        {/* 🔹 fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
