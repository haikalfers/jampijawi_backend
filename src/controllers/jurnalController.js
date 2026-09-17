import pool from "../config/db.js";

// Ambil semua jurnal milik user
export const getJurnal = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM jurnal WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );

    const jurnal = rows.map((item) => ({
    ...item,
    gejala: typeof item.gejala === "string" ? JSON.parse(item.gejala) : item.gejala,
    selesai_hari_ini: {
        pagi: item.selesai_pagi === 1,
        malam: item.selesai_malam === 1,
    },
    }));

    res.json({ jurnal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Tambah item jurnal baru
export const addJurnal = async (req, res) => {
  const { nama, foto, kategori, severity, gejala, dosis } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO jurnal (user_id, nama, foto, kategori, severity, gejala, dosis) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [req.user.id, nama, foto, kategori, severity, JSON.stringify(gejala), dosis]
    );

    res.status(201).json({ message: "Jurnal berhasil ditambahkan", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update status dosis
export const toggleDosis = async (req, res) => {
  const { id } = req.params;
  const { waktu, value } = req.body; // waktu: "pagi" atau "malam"

  const kolom = waktu === "pagi" ? "selesai_pagi" : "selesai_malam";

  try {
    await pool.query(
      `UPDATE jurnal SET ${kolom} = ? WHERE id = ? AND user_id = ?`,
      [value, id, req.user.id]
    );

    res.json({ message: "Status dosis diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Hapus item jurnal
export const hapusJurnal = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM jurnal WHERE id = ? AND user_id = ?",
      [id, req.user.id]
    );

    res.json({ message: "Jurnal berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};