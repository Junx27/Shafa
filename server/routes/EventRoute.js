import express from "express";

import {
  getEvents,
  getEventsById,
  createEvents,
  updateEvents,
  deleteEvents,
} from "../controllers/Events.js";

const router = express.Router();

router.get("/events", getEvents);
router.get("/events/:id", getEventsById);
router.post("/events", createEvents);
router.patch("/events/:id", updateEvents);
router.delete("/events/:id", deleteEvents);

export default router;
