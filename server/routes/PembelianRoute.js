import express from "express";

import {
  getPembelians,
  getPembelianById,
  createPembelians,
  updatePembelians,
  deletePembelians,
} from "../controllers/Pembelians.js";

const router = express.Router();

router.get("/pembelians");
router.get("/pembelians/:id");
router.post("/pembelians");
router.patch("/pembelians/:id");
router.delete("/pembelians/:id");

export default router;
