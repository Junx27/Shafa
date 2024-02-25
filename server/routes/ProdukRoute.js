import express from "express";
import {
  getProduks,
  getProdukByStatus,
  getProduksById,
  createProduks,
  updateProduks,
  deleteProduks,
} from "../controllers/Produks.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get("/produk", getProduks);
router.get("/produk/status/promo", getProdukByStatus);
router.get("/produk/:id", getProduksById);
router.post("/produk", verifyAdmin, createProduks);
router.patch("/produk/:id", updateProduks);
router.delete("/produk/:id", deleteProduks);

export default router;
