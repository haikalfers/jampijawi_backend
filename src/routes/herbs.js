import express from "express";
import { getAllHerbs, getHerbBySlug } from "../controllers/herbsController.js";

const router = express.Router();

router.get("/", getAllHerbs);
router.get("/:slug", getHerbBySlug);

export default router;