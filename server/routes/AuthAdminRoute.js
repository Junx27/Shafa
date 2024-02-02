import express from "express";

import { Login, Logout, Me } from "../controllers/AuthAdmin.js";

const router = express.Router();

router.get("/adminme", Me);
router.post("/adminlogin", Login);
router.delete("/adminlogout", Logout);

export default router;
