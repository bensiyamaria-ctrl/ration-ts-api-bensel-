
import type { Request, Response } from "express";
import {
  fetchAllStock,
  fetchStockByProduct,
  createStock,
  increaseStock,
  decreaseStock,
  updateStockQuantity,
} from "../services/stockService.js";

// Get all stock records
export async function getAllStockController(
  req: Request,
  res: Response
) {
  try {
    const stock = await fetchAllStock();
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to fetch stock",
    });
  }
}

// Get stock for one product
export async function getStockByProductController(
  req: Request,
  res: Response
) {
  try {
    const productId = Number(req.params.productId);

    if (!Number.isInteger(productId) || productId <= 0) {
      res.status(400).json({ message: "Invalid product ID" });
      return;
    }

    const stock = await fetchStockByProduct(productId);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to fetch stock",
    });
  }
}

// Create initial stock
export async function createStockController(
  req: Request,
  res: Response
) {
  try {
    const { productId, quantity } = req.body;

    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      res.status(400).json({
        message: "Valid productId and non-negative integer quantity are required",
      });
      return;
    }

    const stock = await createStock(productId, quantity);
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to create stock",
    });
  }
}

// Receive stock
export async function increaseStockController(
  req: Request,
  res: Response
) {
  try {
    const { productId, quantity } = req.body;

    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      res.status(400).json({
        message: "Valid productId and positive integer quantity are required",
      });
      return;
    }

    const stock = await increaseStock(productId, quantity);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to receive stock",
    });
  }
}

// Issue stock
export async function decreaseStockController(
  req: Request,
  res: Response
) {
  try {
    const { productId, quantity } = req.body;

    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      res.status(400).json({
        message: "Valid productId and positive integer quantity are required",
      });
      return;
    }

    const stock = await decreaseStock(productId, quantity);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to issue stock",
    });
  }
}

// Set exact stock quantity
export async function updateStockQuantityController(
  req: Request,
  res: Response
) {
  try {
    const { productId, quantity } = req.body;

    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      res.status(400).json({
        message: "Valid productId and non-negative integer quantity are required",
      });
      return;
    }

    const stock = await updateStockQuantity(productId, quantity);
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to update stock",
    });
  }
}
