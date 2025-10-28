import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AdminFilmList() {
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const res = await API.get("/films");
      setFilms(res.data);
    } catch (err) {
      console.error("Gagal mengambil film:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus film ini?")) return;

    const token = localStorage.getItem("token");
    try {
      await API.delete(`/films/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFilms(films.filter((film) => film._id !== id));
    } catch (err) {
      console.error("Gagal menghapus film:", err);
      alert("Gagal menghapus film");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daftar Film</h2>
      <button
        onClick={() => navigate("/admin/films/create")}
        style={{ marginBottom: "15px" }}
      >
        + Tambah Film
      </button>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Judul</th>
            <th>Genre</th>
            <th>Durasi</th>
            <th>Rating</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film._id}>
              <td>{film.title}</td>
              <td>{film.genre}</td>
              <td>{film.duration}</td>
              <td>{film.rating}</td>
              <td>
                <Link to={`/admin/films/edit/${film._id}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(film._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
