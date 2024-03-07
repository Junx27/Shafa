import express from "express";
import {
  getPembayaran,
  getPembayaranTerbayar,
  getPembayaranBelumBayar,
  getPembayaranSelesai,
  getPembayaranById,
  createPembayaran,
  updatePembayaran,
  deletePembayaran,
} from "../controllers/Pembayaran.js";
import { verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get("/pembayaran", getPembayaran);
router.get("/pembayaran/sudah", getPembayaranTerbayar);
router.get("/pembayaran/belum", getPembayaranBelumBayar);
router.get("/pembayaran/penerimaan/selesai", getPembayaranSelesai);
router.get("/pembayaran/:id", getPembayaranById);
router.post("/pembayaran", verifyUser, createPembayaran);
router.patch("/pembayaran/:id", updatePembayaran);
router.delete("/pembayaran/:id", deletePembayaran);

export default router;
