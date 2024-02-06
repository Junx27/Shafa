import express from "express";
import {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";
import { verifyUser } from "../middleware/Auth.js";
const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", verifyUser, getUsersById);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, updateUser);
router.delete("/users/:id", deleteUser);

export default router;
