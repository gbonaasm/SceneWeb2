import React from "react";
import { Routes, Route } from "react-router-dom";
import FilmList from "./pages/FilmList";
import FilmDetail from "./pages/FilmDetail";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminFilmCreate from "./pages/AdminFilmCreate";
import AdminFilmEdit from "./pages/AdminFilmEdit";
import AdminFilmList from "./pages/AdminFilmList";
import AdminRoute from "./components/AdminRoute";   // 🔹 import komponen proteksi

export default function App() {
  return (
    <div style={{ background: "#111", color: "white", minHeight: "100vh", padding: "20px" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Navbar />
      </nav>

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/films" element={<FilmList />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/about" element={<h2>Website Streaming Sederhana 🚀</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Only */}
        <Route path="/admin/films" element={<AdminRoute> 
          <AdminFilmList />
        </AdminRoute>}
        />
        <Route path="/admin/films/create" element={<AdminRoute>
          <AdminFilmCreate />
        </AdminRoute>}/>
        
        <Route path="/admin/films/edit/:id" element={<AdminRoute>
            <AdminFilmEdit />
        </AdminRoute>}/>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
