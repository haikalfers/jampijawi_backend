import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

pool.getConnection()
    .then(() => console.log("✅ MySQL connected"))
    .catch((err) => console.error("❌ MySQL connection error:", err));

export default pool;