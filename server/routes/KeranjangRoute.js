import express from "express";

import {
  getKeranjangs,
  getKeranjangsById,
  createKeranjangs,
  updateKeranjangs,
  deleteKeranjangs,
} from "../controllers/Keranjangs.js";

const router = express.Router();

router.get("/keranjangs");
router.get("/keranjangs/:id");
router.post("/keranjangs");
router.patch("/keranjangs/:id");
router.delete("/keranjangs/:id");

export default router;
