import React from "react";
import { useParams, Link } from "react-router-dom";
import { films } from "../data/Film"; // ✅ ambil data dari 1 tempat

export default function FilmDetail() {
  const { id } = useParams();
  const film = films.find((f) => f.id === parseInt(id));

  if (!film) return <h2>Film tidak ditemukan</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ color: "cyan", display: "block", marginBottom: "20px" }}>⬅ Kembali</Link>
      
      <h2>{film.title}</h2>
      <p><strong>Genre:</strong> {film.genre}</p>
      <p><strong>Durasi:</strong> {film.duration}</p>
      <p><strong>Rating:</strong> ⭐ {film.rating}</p>
      <p>{film.description}</p>

      <video width="100%" height="400" controls>
        <source src={film.src} type="video/mp4" />
        Browser tidak mendukung video tag.
      </video>
    </div>
  );
}
