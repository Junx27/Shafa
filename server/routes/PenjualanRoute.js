import express from "express";
import {
  getPenjualans,
  getPenjualansById,
  createPenjualans,
  updatePenjualans,
  deletePenjualans,
} from "../controllers/Penjualans.js";

const router = express.Router();

router.get("/penjualans");
router.get("/penjualans/:id");
router.post("/penjualans");
router.patch("/penjualans/:id");
router.delete("/penjualans/:id");

export default router;
