import express from "express";
import {
  getInformasi,
  getInformasiById,
  createInformasi,
  updateInformasi,
  deleteInformasi,
} from "../controllers/Informasi.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get("/informasi", getInformasi);
router.get("/informasi/:id", getInformasiById);
router.post("/informasi", verifyAdmin, createInformasi);
router.patch("/informasi/:id", updateInformasi);
router.delete("/informasi/:id", deleteInformasi);

export default router;
