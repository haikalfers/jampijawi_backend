import express from "express";
import { getJurnal, addJurnal, toggleDosis, hapusJurnal } from "../controllers/jurnalController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getJurnal);
router.post("/", verifyToken, addJurnal);
router.patch("/:id/toggle", verifyToken, toggleDosis);
router.delete("/:id", verifyToken, hapusJurnal);

export default router;