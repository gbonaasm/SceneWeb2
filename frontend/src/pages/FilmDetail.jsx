import React from "react";
import { useParams, Link } from "react-router-dom";
import { films } from "../data/films";

export default function FilmDetail() {
  const { id } = useParams();
  const film = films.find((f) => f.id === parseInt(id));

  if (!film) return <h2>Film tidak ditemukan</h2>;

  // 🔹 Cari film terkait (film lain dengan tagar yang sama)
  const relatedFilms = films.filter(
    (f) => f.id !== film.id && f.tags.some((tag) => film.tags.includes(tag))
  );

  return (
    <div style={{ padding: "20px" }}>
      <Link
        to="/"
        style={{ color: "cyan", display: "block", marginBottom: "20px" }}
      >
        ⬅ Kembali
      </Link>

      <h2>{film.title}</h2>
      <p>
        <strong>Genre:</strong> {film.genre}
      </p>
      <p>
        <strong>Durasi:</strong> {film.duration}
      </p>
      <p>
        <strong>Rating:</strong> ⭐ {film.rating}
      </p>
      <p>{film.description}</p>

      <video width="100%" height="400" controls>
        <source src={film.src} type="video/mp4" />
        Browser tidak mendukung video tag.
      </video>

      {/* 🔹 Section Tagar */}
      <div style={{ marginTop: "20px" }}>
        <h3>🏷️ Tagar</h3>
        {film.tags.map((tag) => (
          <Link
            key={tag}
            to={`/films?tag=${tag}`}   // ✅ arahkan ke FilmList
            style={{
              display: "inline-block",
              marginRight: "10px",
              marginBottom: "10px",
              padding: "5px 10px",
              borderRadius: "20px",
              background: "#333",
              color: "cyan",
              fontSize: "12px",
              textDecoration: "none",
            }}
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* 🔹 Section Film Terkait */}
      {relatedFilms.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>🎯 Film Terkait</h3>
          <div
            style={{
              display: "flex",
              gap: "15px",
              overflowX: "auto",
              paddingBottom: "10px",
            }}
          >
            {relatedFilms.map((rel) => (
              <Link
                key={rel.id}   // ✅ perbaikan: pakai rel.id, bukan tag
                to={`/film/${rel.id}`}   // ✅ tetap ke detail film
                style={{ color: "white", textDecoration: "none" }}
              >
                <div
                  style={{
                    minWidth: "200px",
                    background: "#222",
                    padding: "10px",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                  <p style={{ marginTop: "10px" }}>{rel.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
