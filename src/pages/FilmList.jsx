import React, { useState } from "react";
import { Link } from "react-router-dom";
import { films } from "../data/Film"; // ✅ pakai data global

export default function FilmList() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // ambil daftar genre unik
  const genres = ["All", ...new Set(films.map((f) => f.genre))];

  // filter film berdasarkan search & genre
  const filteredFilms = films.filter((film) => {
    const matchesSearch = film.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "All" || film.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>🎥 Daftar Film</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "100%", borderRadius: "5px", border: "1px solid #333" }}
      />

      {/* Filter Genre */}
      <div style={{ marginBottom: "20px" }}>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            style={{
              marginRight: "10px",
              padding: "6px 12px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              background: selectedGenre === g ? "cyan" : "#333",
              color: selectedGenre === g ? "#000" : "#fff"
            }}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Grid Film */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => (
            <div key={film.id} style={{ background: "#222", padding: "10px", borderRadius: "8px" }}>
              <img src={film.thumbnail} alt={film.title} style={{ width: "100%", borderRadius: "5px" }} />
              <h3 style={{ margin: "10px 0" }}>{film.title}</h3>
              <p style={{ fontSize: "14px", color: "#aaa" }}>{film.genre}</p>
              <Link to={`/film/${film.id}`} style={{ color: "cyan" }}>
                ▶ Tonton
              </Link>
            </div>
          ))
        ) : (
          <p>Tidak ada film ditemukan</p>
        )}
      </div>
    </div>
  );
}
