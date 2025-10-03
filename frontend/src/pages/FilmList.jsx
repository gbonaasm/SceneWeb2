import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../api/api";

export default function FilmList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedTag = queryParams.get("tag");

  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    API.get("/films")
      .then((res) => setFilms(res.data))
      .catch((err) => console.error(err));
  }, []);

  const genres = ["All", ...new Set(films.map((film) => film.genre))];

  const filteredFilms = films.filter((film) => {
    const matchSearch = film.title.toLowerCase().includes(search.toLowerCase());
    const matchGenre = selectedGenre === "All" ? true : film.genre === selectedGenre;
    const matchTag = selectedTag ? film.tags.includes(selectedTag) : true;
    return matchSearch && matchGenre && matchTag;
  });

  return (
    <div>
      <h2>🎥 Daftar Film</h2>

      <input
        type="text"
        placeholder="Cari film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
      />

      {selectedTag && (
        <p style={{ color: "cyan" }}>
          Menampilkan film dengan tagar: <strong>#{selectedTag}</strong>
        </p>
      )}

      <div style={{ marginBottom: "20px" }}>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            style={{
              marginRight: "10px",
              background: selectedGenre === g ? "cyan" : "#333",
              color: selectedGenre === g ? "#000" : "#fff",
              padding: "6px 12px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {g}
          </button>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px"
      }}>
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => (
            <div key={film._id} style={{ background: "#222", padding: "10px", borderRadius: "8px" }}>
              <img src={film.thumbnail} alt={film.title} style={{ width: "100%", borderRadius: "5px" }} />
              <h3>{film.title}</h3>
              <p>{film.genre}</p>
              <Link to={`/film/${film._id}`} style={{ color: "cyan" }}>
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