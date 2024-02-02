import express from "express";
import {
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/Admin.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";
const router = express.Router();

router.get("/admin", getAdmin);
router.get("/admin/:id", verifyAdmin, getAdminById);
router.post("/admin", createAdmin);
router.patch("/admin/:id", verifyAdmin, updateAdmin);
router.delete("/admin/:id", verifyAdmin, deleteAdmin);

export default router;
