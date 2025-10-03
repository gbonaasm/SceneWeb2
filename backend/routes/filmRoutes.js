import express from "express";
import Film from "../models/Film.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getFilms, getFilmById, addComment, likeFilm } from "../controllers/filmController.js";

const router = express.Router();

// ✅ GET semua film
router.get("/", async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET film by ID
router.get("/:id", async (req, res) => {
  try {
    const film = await Film.findById(req.params.id)
      .populate("comments.user", "name"); // ✅ ambil nama user dari komentar
    if (!film) return res.status(404).json({ message: "Film tidak ditemukan" });
    res.json(film);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ POST tambah film
router.post("/", async (req, res) => {
  try {
    const newFilm = new Film(req.body);
    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT update film
router.put("/:id", async (req, res) => {
  try {
    const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedFilm)
      return res.status(404).json({ message: "Film tidak ditemukan" });
    res.json(updatedFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE hapus film
router.delete("/:id", async (req, res) => {
  try {
    const deletedFilm = await Film.findByIdAndDelete(req.params.id);
    if (!deletedFilm)
      return res.status(404).json({ message: "Film tidak ditemukan" });
    res.json({ message: "Film berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Like film
// Like / Unlike
router.post("/:id/like", protect, async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: "Film tidak ditemukan" });

    const userId = req.user._id.toString();

    if (film.likes.some((id) => id.toString() === userId)) {
      // sudah like → unlike
      film.likes = film.likes.filter((id) => id.toString() !== userId);
    } else {
      // belum like → tambahkan
      film.likes.push(req.user._id);
    }

    await film.save();
    res.json(film);
  } catch (err) {
    console.error("❌ Like error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// ✅ Tambah komentar
router.post("/:id/comment", protect, async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: "Film tidak ditemukan" });

    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Komentar tidak boleh kosong" });

    film.comments.push({ user: req.user._id, text });
    await film.save();

    const updatedFilm = await Film.findById(req.params.id).populate("comments.user", "name");
    res.json(updatedFilm);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Tambah film (admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const newFilm = new Film(req.body);
    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update film (admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const updatedFilm = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFilm) return res.status(404).json({ message: "Film tidak ditemukan" });
    res.json(updatedFilm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
