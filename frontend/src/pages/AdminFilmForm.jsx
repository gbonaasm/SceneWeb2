import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminFilmForm({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [film, setFilm] = useState({
    title: "",
    description: "",
    genre: "",
    duration: "",
    rating: "",
    src: "",
    tags: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchFilm();
    }
  }, [isEdit]);

  const fetchFilm = async () => {
    try {
      const res = await API.get(`/films/${id}`);
      setFilm({
        ...res.data,
        tags: res.data.tags?.join(",") || "",
      });
    } catch (err) {
      console.error("Gagal load film:", err);
    }
  };

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const payload = {
        ...film,
        tags: film.tags.split(",").map((t) => t.trim()),
      };

      if (isEdit) {
        await API.put(`/films/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await API.post(`/films`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/admin/films");
    } catch (err) {
      console.error("❌ Error simpan film:", err);
      alert("Gagal menyimpan film");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isEdit ? "Edit Film" : "Tambah Film Baru"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Judul Film"
          value={film.title}
          onChange={handleChange}
          required
        /><br />

        <textarea
          name="description"
          placeholder="Deskripsi"
          value={film.description}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={film.genre}
          onChange={handleChange}
        /><br />

        <input
          type="number"
          name="duration"
          placeholder="Durasi (menit)"
          value={film.duration}
          onChange={handleChange}
        /><br />

        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating"
          value={film.rating}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="src"
          placeholder="Link video"
          value={film.src}
          onChange={handleChange}
        /><br />

        <input
          type="text"
          name="tags"
          placeholder="Tags (pisahkan dengan koma)"
          value={film.tags}
          onChange={handleChange}
        /><br />

        <button type="submit">
          {isEdit ? "Update Film" : "Simpan Film"}
        </button>
      </form>
    </div>
  );
}
