import express, { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/api/orders", getOrders);
router.post("/api/orders", createOrder);
router.get("/api/orders/:id", getOrderById);
router.delete("/api/orders/:id", deleteOrder);

export default router;
