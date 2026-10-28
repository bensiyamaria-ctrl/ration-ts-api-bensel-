
import { Router } from "express";
import {
  getAllStockController,
  getStockByProductController,
  createStockController,
  increaseStockController,
  decreaseStockController,
  updateStockQuantityController,
} from "../controllers/stockController.js";

const router = Router();

// Get all stock records
router.get("/", getAllStockController);

// Get stock for one product
router.get("/:productId", getStockByProductController);

// Create initial stock record
router.post("/", createStockController);

// Receive stock
router.post("/receive", increaseStockController);

// Issue stock
router.post("/issue", decreaseStockController);

// Set exact stock quantity
router.patch("/quantity", updateStockQuantityController);

export default router;
