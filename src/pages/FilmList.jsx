///////testing//////

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FilmList() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

const films = [
  { 
    id: 1, 
    title: "Film Pertama", 
    genre: "Aksi", 
    duration: "1j 30m", 
    rating: 4.5, 
    description: "Film aksi seru tentang petualangan seorang pahlawan melawan kejahatan.", 
    src: "https://www.w3schools.com/html/mov_bbb.mp4", 
    thumbnail: "https://placehold.co/300x180?text=Film+1" 
  },
  { 
    id: 2, 
    title: "Film Kedua", 
    genre: "Drama", 
    duration: "2j 10m", 
    rating: 4.0, 
    description: "Drama emosional yang menceritakan kisah keluarga penuh perjuangan.", 
    src: "https://www.w3schools.com/html/movie.mp4", 
    thumbnail: "https://placehold.co/300x180?text=Film+2" 
  }
];


  // Ambil semua genre unik
  const genres = ["All", ...new Set(films.map((film) => film.genre))];

  // Filter berdasarkan search & genre
  const filteredFilms = films.filter((film) => {
    const matchSearch = film.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = selectedGenre === "All" || film.genre === selectedGenre;
    return matchSearch && matchGenre;
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
              <Link to={`/film/${film.id}`} state={{ film }} style={{ color: "cyan" }}>
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
