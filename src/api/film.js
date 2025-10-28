import connectDB from "../backend/config/db.js";
import Film from "../backend/models/Film.js";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import { protect, admin } from "../backend/middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // penting untuk upload file pakai formidable
  },
};

export default async function handler(req, res) {
  await connectDB();

  const { method, query } = req;

  try {
    // 🔹 GET semua film
    if (method === "GET" && !query.id) {
      const films = await Film.find();
      return res.status(200).json(films);
    }

    // 🔹 GET detail film
    if (method === "GET" && query.id) {
      const film = await Film.findById(query.id).populate("comments.user", "name");
      if (!film) return res.status(404).json({ message: "Film tidak ditemukan" });
      return res.status(200).json(film);
    }

    // 🔹 POST tambah film (admin only)
    if (method === "POST") {
      // Cek auth dan role
      const user = await protect(req, res);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Akses ditolak (admin only)" });
      }

      const form = formidable({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ message: "Upload gagal", error: err });

        const { title, description, genre, duration, rating, tags } = fields;

        const thumbnailFile = files.thumbnail?.[0];
        const videoFile = files.video?.[0];

        if (!thumbnailFile || !videoFile) {
          return res.status(400).json({ message: "Thumbnail dan video wajib diupload" });
        }

        // Upload ke Cloudinary
        const thumbResult = await cloudinary.uploader.upload(thumbnailFile.filepath, {
          resource_type: "image",
          folder: "films",
        });

        const videoResult = await cloudinary.uploader.upload(videoFile.filepath, {
          resource_type: "video",
          folder: "films",
        });

        const newFilm = new Film({
          title,
          description,
          genre,
          duration,
          rating,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [],
          thumbnail: thumbResult.secure_url,
          src: videoResult.secure_url,
        });

        await newFilm.save();
        return res.status(201).json(newFilm);
      });
      return;
    }

    // 🔹 PUT update film
    if (method === "PUT") {
      const user = await protect(req, res);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Akses ditolak (admin only)" });
      }

      const form = formidable({ multiples: true });
      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ message: "Gagal parsing form", error: err });

        const { title, description, genre, duration, rating, tags } = fields;
        const updateData = { title, description, genre, duration, rating };

        if (tags) {
          updateData.tags = Array.isArray(tags)
            ? tags
            : tags.split(",").map((t) => t.trim());
        }

        if (files.thumbnail?.[0]) {
          const thumbResult = await cloudinary.uploader.upload(files.thumbnail[0].filepath, {
            resource_type: "image",
            folder: "films",
          });
          updateData.thumbnail = thumbResult.secure_url;
        }

        if (files.video?.[0]) {
          const videoResult = await cloudinary.uploader.upload(files.video[0].filepath, {
            resource_type: "video",
            folder: "films",
          });
          updateData.src = videoResult.secure_url;
        }

        const updatedFilm = await Film.findByIdAndUpdate(query.id, updateData, { new: true });
        if (!updatedFilm) return res.status(404).json({ message: "Film tidak ditemukan" });

        return res.status(200).json(updatedFilm);
      });
      return;
    }

    // 🔹 DELETE film
    if (method === "DELETE") {
      const user = await protect(req, res);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Akses ditolak (admin only)" });
      }

      const deleted = await Film.findByIdAndDelete(query.id);
      if (!deleted) return res.status(404).json({ message: "Film tidak ditemukan" });
      return res.status(204).end();
    }

    // 🔹 LIKE / COMMENT (gunakan endpoint terpisah misal api/films/[id]/like.js, api/films/[id]/comment.js)
    // Supaya modular di Vercel

    return res.status(405).json({ message: `Method ${method} tidak diizinkan` });
  } catch (err) {
    console.error("❌ Error handler:", err);
    res.status(500).json({ message: "Terjadi kesalahan server", error: err.message });
  }
}
