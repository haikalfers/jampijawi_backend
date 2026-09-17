import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import "./src/config/db.js";
import jurnalRoutes from "./src/routes/jurnal.js";
import symptomsRoutes from "./src/routes/symptoms.js";
import herbsRoutes from "./src/routes/herbs.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
origin: [
    "http://localhost:5173",
    "https://jampijawi-frontend.vercel.app"
],
credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jurnal", jurnalRoutes);
app.use("/api/symptoms", symptomsRoutes);
app.use("/api/herbs", herbsRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({ message: "🌿 JampiJawi API is running!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});