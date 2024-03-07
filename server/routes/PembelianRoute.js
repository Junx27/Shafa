import express from "express";
import {
  getPembelian,
  getPembelianByStatus,
  getPembelianById,
  getPembelianByPembayaranId,
  createPembelaian,
  updatePembelian,
  deletePembelian,
} from "../controllers/Pembelian.js";

import { verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get("/pembelian", getPembelian);
router.get("/pembelian/status", getPembelianByStatus);
router.get("/pembelian/pembayaran/:pembayaran_id", getPembelianByPembayaranId);
router.get("/pembelian/:id", getPembelianById);
router.post("/pembelian", verifyUser, createPembelaian);
router.patch("/pembelian/status/:user_id", updatePembelian);
router.delete("/pembelian/user/:user_id", deletePembelian);

export default router;
