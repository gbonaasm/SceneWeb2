import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// =======================
// REGISTER USER
// =======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    // cek email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    // password tidak perlu di-hash manual, biarkan pre-save hook di User.js
    const user = new User({
      name,
      email,
      password,
      role: "user",
    });

    await user.save();

    res.json({ message: "User berhasil dibuat", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// =======================
// REGISTER ADMIN (via Postman / internal)
// =======================
router.post("/register-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const admin = new User({
      name,
      email,
      password, // plain, biar User.js yang hash
      role: "admin",
    });

    await admin.save();

    res.json({ message: "Admin berhasil dibuat", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// =======================
// LOGIN (user & admin)
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    // gunakan method matchPassword dari User.js
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
