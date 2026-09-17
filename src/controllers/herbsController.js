import pool from "../config/db.js";

export const getAllHerbs = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM herbs ORDER BY nama ASC"
    );

    const herbs = rows.map((item) => ({
      ...item,
      bahan: typeof item.bahan === "string" ? JSON.parse(item.bahan) : item.bahan,
    }));

    res.json({ herbs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getHerbBySlug = async (req, res) => {
  const { slug } = req.params;
  const nama = slug.replace(/-/g, " ");

  try {
    const [rows] = await pool.query(
      "SELECT * FROM herbs WHERE LOWER(nama) LIKE ?",
      [`%${nama}%`]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Herb tidak ditemukan" });
    }

    const herb = {
      ...rows[0],
      bahan: typeof rows[0].bahan === "string" ? JSON.parse(rows[0].bahan) : rows[0].bahan,
    };

    res.json({ herb });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};