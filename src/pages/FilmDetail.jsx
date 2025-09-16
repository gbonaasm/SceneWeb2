import React from "react";
import { useParams, Link } from "react-router-dom";

const films = [
  { id: 1, title: "Film Pertama", genre: "Aksi", duration: "1j 30m", rating: 4.5, description: "Film aksi seru tentang pahlawan.", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://placehold.co/300x180?text=Film+1" },
  { id: 2, title: "Film Kedua", genre: "Drama", duration: "2j 10m", rating: 4.0, description: "Drama emosional keluarga.", src: "https://www.w3schools.com/html/movie.mp4", thumbnail: "https://placehold.co/300x180?text=Film+2" }
];

export default function FilmDetail() {
  const { id } = useParams();
  const film = films.find(f => f.id === parseInt(id));

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
