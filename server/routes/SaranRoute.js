import express from "express";

import {
  getSarans,
  getSaransById,
  createSarans,
  updateSarans,
  deleteSarans,
} from "../controllers/Sarans.js";

const router = express.Router();

router.get("/sarans");
router.get("/sarans/:id");
router.post("/sarans");
router.patch("/sarans/:id");
router.delete("/sarans/:id");

export default router;
