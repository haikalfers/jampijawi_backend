import express from "express";
import { getRekomendasi } from "../controllers/symptomsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/rekomendasi", verifyToken, getRekomendasi);

export default router;