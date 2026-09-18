import pool from "../config/db.js";

export const getRekomendasi = async (req, res) => {
  const { symptomIds } = req.body;

  if (!symptomIds || symptomIds.length === 0) {
    return res.status(400).json({ message: "Pilih minimal satu gejala" });
  }

  try {
    const placeholders = symptomIds.map(() => "?").join(",");

    const [results] = await pool.query(
      `SELECT 
        r.id,
        r.nama,
        r.foto,
        r.tag,
        r.untuk,
        r.waktu,
        r.bahan,
        r.langkah,
        r.desc_singkat,
        SUM(rs.weight) as score
      FROM racikan_symptoms rs
      JOIN racikan r ON r.id = rs.racikan_id
      WHERE rs.symptom_id IN (${placeholders})
      GROUP BY r.id, r.nama, r.foto, r.tag, r.untuk, r.waktu, r.bahan, r.langkah, r.desc_singkat
      ORDER BY score DESC
      LIMIT 3`,
      symptomIds
    );

    if (results.length === 0) {
      return res.json({
        rekomendasi: [],
        message: "Belum ada racikan yang terhubung dengan gejala yang dipilih",
      });
    }

    const rekomendasi = results.map((item) => ({
      ...item,
      bahan: typeof item.bahan === "string" ? JSON.parse(item.bahan) : item.bahan,
      langkah: typeof item.langkah === "string" ? JSON.parse(item.langkah) : item.langkah,
    }));

    res.json({ rekomendasi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};