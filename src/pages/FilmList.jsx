import React from "react";
import { Link, useLocation } from "react-router-dom";
import { films } from "../data/films";

export default function FilmList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tag = params.get("tag"); // 🔹 ambil query ?tag=xxx

  
  
  // Ambil semua genre unik 
  const genres = ["All", ...new Set(films.map((film) => film.genre))];

  // 🔹 Filter film berdasarkan tag jika ada
  const filteredFilms = tag
    ? films.filter((film) => film.tags.includes(tag))
    : films;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📽️ Daftar Film</h2>

      {/* 🔹 Jika ada filter tag */}
      {tag && (
        <p style={{ marginBottom: "15px", color: "cyan" }}>
          Menampilkan film dengan tagar: <strong>#{tag}</strong>
        </p>
      )}

      {/* 🔹 List Film */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredFilms.map((film) => (
          <Link
            key={film.id}
            to={`/film/${film.id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <div
              style={{
                background: "#222",
                borderRadius: "8px",
                padding: "10px",
                transition: "0.3s",
              }}
            >
              <img
                src={film.thumbnail}
                alt={film.title}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <h3 style={{ marginTop: "10px" }}>{film.title}</h3>
              <p style={{ fontSize: "14px", color: "gray" }}>{film.genre}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔹 Jika tidak ada film ditemukan */}
      {filteredFilms.length === 0 && (
        <p style={{ marginTop: "20px", color: "red" }}>
          Tidak ada film dengan tagar <strong>#{tag}</strong>.
        </p>
      )}
    </div>
  );
}
