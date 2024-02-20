import express from "express";
import {
  getTransaksis,
  getTransaksisById,
  createTransaksis,
  updateTransaksis,
  deleteTransaksis,
  deleteTransaksiByProductName,
  deleteTransaksiByUserId,
  createTransaksiArray,
} from "../controllers/Transaksis.js";
import { verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get("/transaksis", getTransaksis);
router.get("/transaksis/:id", getTransaksisById);
router.post("/transaksis", verifyUser, createTransaksis);
router.post("/transaksisarray", verifyUser, createTransaksiArray);
router.patch("/transaksis/:id", updateTransaksis);
router.delete("/transaksis/:id", deleteTransaksis);
router.delete("/transaksis/nama/:nama_produk", deleteTransaksiByProductName);
router.delete("/transaksis/user/:user_id", deleteTransaksiByUserId);

export default router;
