import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const films = [
    { id: 1, title: "Film Pertama", genre: "Aksi", duration: "1j 30m", rating: 4.5, description: "Film aksi seru tentang petualangan seorang pahlawan.", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://placehold.co/300x180?text=Film+1" },
    { id: 2, title: "Film Kedua", genre: "Drama", duration: "2j 10m", rating: 4.0, description: "Drama emosional penuh perjuangan.", src: "https://www.w3schools.com/html/movie.mp4", thumbnail: "https://placehold.co/300x180?text=Film+2" },
    { id: 3, title: "Film Lucu", genre: "Komedi", duration: "1j 20m", rating: 3.8, description: "Film komedi segar untuk hiburan keluarga.", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://placehold.co/300x180?text=Film+3" },
    { id: 4, title: "Film Aksi Seru", genre: "Aksi", duration: "1j 50m", rating: 4.7, description: "Aksi tanpa henti dengan efek spektakuler.", src: "https://www.w3schools.com/html/movie.mp4", thumbnail: "https://placehold.co/300x180?text=Film+4" },
  ];

  const featuredFilm = films[0]; // Banner ambil film pertama
  const sections = ["Aksi", "Drama", "Komedi"];

  return (
    <div>
      {/* Banner */}
      <div style={{
        backgroundImage: `url(${featuredFilm.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: "80px 20px",
        marginBottom: "30px",
        borderRadius: "10px"
      }}>
        <h1 style={{ fontSize: "40px" }}>{featuredFilm.title}</h1>
        <p style={{ maxWidth: "600px" }}>{featuredFilm.description}</p>
        <Link to={`/film/${featuredFilm.id}`} state={{ film: featuredFilm }} style={{
          background: "cyan",
          color: "#000",
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold"
        }}>
          ▶ Tonton Sekarang
        </Link>
      </div>

      {/* Sections */}
      {sections.map((genre) => (
        <div key={genre} style={{ marginBottom: "40px" }}>
          <h2 style={{ marginBottom: "15px" }}>{genre} Populer</h2>
          <div style={{
            display: "flex",
            gap: "15px",
            overflowX: "auto",
            paddingBottom: "10px"
          }}>
            {films.filter(f => f.genre === genre).map((film) => (
              <div key={film.id} style={{ minWidth: "200px", background: "#222", borderRadius: "8px", padding: "10px" }}>
                <img src={film.thumbnail} alt={film.title} style={{ width: "100%", borderRadius: "5px" }} />
                <h3 style={{ fontSize: "16px", margin: "8px 0" }}>{film.title}</h3>
                <Link to={`/film/${film.id}`} state={{ film }} style={{ color: "cyan" }}>▶ Tonton</Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
