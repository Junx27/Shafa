import express from "express";

import {
  getInformasis,
  getInformasisById,
  createInformasis,
  updateInformasis,
  deleteInformasis,
} from "../controllers/Informasis.js";

const router = express.Router();

router.get("/informasis");
router.get("/informasis/:id");
router.post("/informasis");
router.patch("/informasis/:id");
router.delete("/informasis/:id");

export default router;
