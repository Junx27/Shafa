import express from "express";
import {
  getKritik,
  getKritikById,
  createKritik,
  updateKritik,
  deleteKritik,
} from "../controllers/Kritik.js";
import { verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get("/kritik", getKritik);
router.get("/kritik/:id", getKritikById);
router.post("/kritik", verifyUser, createKritik);
router.patch("/kritik/:id", updateKritik);
router.delete("/kritik/:id", deleteKritik);

export default router;
