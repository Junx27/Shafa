import express from "express";
import {
  getTestimonis,
  getTestimonisById,
  createTestimonis,
  updateTestimonis,
  deleteTestimonis,
} from "../controllers/Testimonis.js";

const router = express.Router();

router.get("/testimonis", getTestimonis);
router.get("/testimonis/:id", getTestimonisById);
router.post("/testimonis", createTestimonis);
router.patch("/testimonis/:id", updateTestimonis);
router.delete("/testimonis/:id", deleteTestimonis);

export default router;
