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
    tags: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // 🚀 Kalau edit, fetch data film dulu
  useEffect(() => {
    if (isEdit && id) {
      fetchFilm();
    }
  }, [isEdit, id]);

  const fetchFilm = async () => {
    try {
      const res = await API.get(`/films/${id}`);
      setFilm({
        ...res.data,
        tags: res.data.tags?.join(",") || "",
      });
    } catch (err) {
      console.error("❌ Gagal load film:", err);
    }
  };

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "thumbnail") setThumbnailFile(files[0]);
    if (name === "video") setVideoFile(files[0]);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const formData = new FormData();

    // ✅ Tambahkan field teks
    Object.entries(film).forEach(([key, value]) => {
      if (key === "tags") {
        const tagArray = value
          .split(",")
          .map((t) => t.trim().replace(/^#/, "")) // hilangkan tanda #
          .filter(Boolean);

        // Simpan tiap tag sebagai array terpisah
        tagArray.forEach((tag) => formData.append("tags", tag));
      } else {
        formData.append(key, value);
      }
    }); // ← kamu tadi lupa nutup blok ini

    // ✅ Tambahkan file jika ada
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    if (videoFile) formData.append("video", videoFile);

    // ✅ Kirim data
    if (isEdit) {
      await API.put(`/films/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      await API.post(`/films`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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

      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          type="text"
          name="duration"
          placeholder="Durasi (contoh: 1j 30m)"
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

        {/* ✅ Upload Thumbnail */}
        <label>Thumbnail:</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange}
        /><br />

        {/* ✅ Upload Video */}
        <label>Video:</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
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
