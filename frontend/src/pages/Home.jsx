import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { films } from "../data/films";

export default function Home() {
  const featuredFilm = films[0];
  const sectionRefs = useRef({});

  // Ambil semua genre unik dari list film
  const sections = [...new Set(films.map(film => film.genre))];

  const scrollSection = (genre, direction) => {
    const container = sectionRefs.current[genre];
    if (container) {
      const scrollAmount = 250;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Banner */}
      <div
        style={{
          backgroundImage: `url(${featuredFilm.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "80px 20px",
          marginBottom: "30px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>{featuredFilm.title}</h1>
        <p style={{ maxWidth: "600px" }}>{featuredFilm.description}</p>
        <Link
          to={`/film/${featuredFilm.id}`}
          style={{
            background: "cyan",
            color: "#000",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          ▶ Tonton Sekarang
        </Link>
      </div>

      {/* Sections */}
      {sections.map((genre) => (
        <div key={genre} style={{ marginBottom: "40px", position: "relative" }}>
          <h2 style={{ marginBottom: "15px" }}>{genre} Populer</h2>

          {/* Scroll kiri */}
          <button
            onClick={() => scrollSection(genre, "left")}
            style={{
              position: "absolute",
              left: 0,
              top: "35px",
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
            }}
          >
            ‹
          </button>

          {/* Scroll kanan */}
          <button
            onClick={() => scrollSection(genre, "right")}
            style={{
              position: "absolute",
              right: 0,
              top: "35px",
              zIndex: 10,
              background: "rgba(0,0,0,0.5)",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
            }}
          >
            ›
          </button>

          <div
            ref={(el) => (sectionRefs.current[genre] = el)}
            style={{ display: "flex", gap: "15px", overflowX: "auto", paddingBottom: "10px", scrollBehavior: "smooth" }}
          >
            {films.filter((f) => f.genre === genre).map((film) => (
              <div key={film.id} style={{ minWidth: "200px", background: "#222", borderRadius: "8px", padding: "10px" }}>
                <Link to={`/film/${film.id}`} style={{ textDecoration: "none" }}>
                  <img src={film.thumbnail} alt={film.title} style={{ width: "100%", borderRadius: "5px" }} />
                  <h3 style={{ fontSize: "16px", margin: "8px 0", color: "#fff" }}>{film.title}</h3>
                  <p style={{ fontSize: "14px", color: "#aaa" }}>⭐ {film.rating}</p>
                  <div>
                    {film.tags && film.tags.map((tag) => (
                      <span key={tag} style={{ display: "inline-block", marginRight: "5px", padding: "2px 6px", borderRadius: "12px", background: "#333", color: "cyan", fontSize: "10px" }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
