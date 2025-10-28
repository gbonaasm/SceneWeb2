import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchFilm();
  }, [id]);

  const fetchFilm = async () => {
    try {
      const res = await API.get(`/films/${id}`);
      setFilm(res.data);
      setLoading(false);
    } catch (err) {
      setError("Gagal memuat film");
      setLoading(false);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // 🚀 lempar ke login
      return;
    }

    try {
      await API.post(
        `/films/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFilm(); // refresh data
    } catch (err) {
      console.error(err);
      alert("Gagal memberi like, pastikan sudah login");
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // 🚀 lempar ke login
      return;
    }

    try {
      await API.post(
        `/films/${id}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      fetchFilm();
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan komentar, pastikan sudah login");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{film.title}</h2>
      <video width="100%" controls src={film.src}></video>
      <p>{film.desc}</p>
      <p><strong>Genre:</strong> {film.genre}</p>
      <p><strong>Durasi:</strong> {film.duration} menit</p>
      <p><strong>Rating:</strong> {film.rating}</p>

      {/* Tagar */}
      {film.tags && film.tags.length > 0 && (
        <div style={{ margin: "10px 0" }}>
          <strong>Tags: </strong>
          {film.tags.map((tag, i) => (
            <Link
              key={i}
              to={`/films?tag=${tag}`}
              style={{
                marginRight: "8px",
                color: "cyan",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Tombol Like */}
      <button
        onClick={handleLike}
        style={{
          background: "red",
          color: "#fff",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        ❤️ Like ({film.likes.length})
      </button>

      {/* Form Komentar */}
      <form onSubmit={handleComment} style={{ marginTop: "20px" }}>
        <textarea
          placeholder="Tulis komentar..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            background: "cyan",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Kirim
        </button>
      </form>

      {/* Daftar Komentar */}
      <div style={{ marginTop: "20px" }}>
        <h3>Komentar</h3>
        {film.comments.length > 0 ? (
          film.comments.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#222",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <p><strong>{c.user?.name || "Anonim"}:</strong></p>
              <p>{c.text}</p>
            </div>
          ))
        ) : (
          <p>Belum ada komentar</p>
        )}
      </div>
    </div>
  );
}
