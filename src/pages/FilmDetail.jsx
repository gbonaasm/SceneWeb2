import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function FilmDetail() {
  const location = useLocation();
  const { film } = location.state;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ color: "cyan", display: "block", marginBottom: "20px" }}>⬅ Kembali</Link>
      
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{film.title}</h2>
      <p><strong>Genre:</strong> {film.genre}</p>
      <p><strong>Durasi:</strong> {film.duration}</p>
      <p><strong>Rating:</strong> ⭐ {film.rating}</p>
      <p style={{ margin: "15px 0" }}>{film.description}</p>

      <video width="100%" height="400" controls>
        <source src={film.src} type="video/mp4" />
        Browser tidak mendukung video tag.
      </video>
    </div>
  );
}
