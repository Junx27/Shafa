import express from "express";
import {
  getPembelian,
  getPembelianById,
  createPembelaian,
  updatePembelian,
  deletePembelian,
} from "../controllers/Pembelian.js";

import { verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get("/pembelian", getPembelian);
router.get("/pembelian/:id", getPembelianById);
router.post("/pembelian", verifyUser, createPembelaian);
router.patch("/pembelian/status/:status", updatePembelian);
router.delete("/pembelian/user/:user_id", deletePembelian);

export default router;
