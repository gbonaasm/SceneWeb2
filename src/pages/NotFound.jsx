import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "80px", margin: "0" }}>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Oops! URL yang kamu buka tidak tersedia.</p>

      <Link to="/" style={{ color: "cyan", textDecoration: "underline" }}>
        ⬅ Kembali ke Home
      </Link>
    </div>
  );
}
