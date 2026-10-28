
import type { Request, Response } from "express";
import { db } from "../config/db.js";

import {fetchAllStock,fetchStockByProduct,createStock,increaseStock,decreaseStock,updateStockQuantity,} from "../services/stockService.js";

// Validate the Supabase access token from the request
async function getAccessToken(req: Request,res: Response): Promise<string | null> 
{
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) 
    {
    res.status(401).json
    ({
      success: false,
      message: "Missing Bearer access token",
    });
    return null;
    }

  const accessToken = authHeader.substring(7).trim();

  if (!accessToken || accessToken.split(".").length !== 3) 
    {
    res.status(401).json
    ({
      success: false,
      message: "Invalid access token format",
    });
    return null;
    }

  const { data, error } = await db.auth.getUser(accessToken);

  if (error || !data.user) 
    {
    res.status(401).json
    ({
      success: false,
      message: "Invalid or expired access token",
    });
    return null;
    }

  return accessToken;
}

// GET /api/stock
export async function getAllStockController(req: Request,res: Response): Promise<void> 
{
  try 
  {
    const accessToken = await getAccessToken(req, res);
    if (!accessToken) 
      return;

    const stock = await fetchAllStock(accessToken);

    res.status(200).json
    ({
      success: true,
      data: stock,
    });
  } 
  catch (error) {
    console.error("Failed to fetch stock:", error);
    res.status(500).json
    ({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch stock",
    });
  }
}

// GET /api/stock/:productId
export async function getStockByProductController(req: Request,res: Response): Promise<void> 
{
  try 
  {
    const accessToken = await getAccessToken(req, res);
    if (!accessToken) return;

    const productId = Number(req.params.productId);

    if (!Number.isInteger(productId) || productId <= 0) 
      {
      res.status(400).json
      ({
        success: false,
        message: "Invalid product ID",
      });
      return;
      }

    const stock = await fetchStockByProduct(productId, accessToken);

    res.status(200).json
    ({
      success: true,
      data: stock,
    });
  } 
  catch (error) 
  {
    console.error("Failed to fetch stock for product:", error);
    res.status(500).json
    ({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch stock",
    });
  }
}

// POST /api/stock
export async function createStockController(req: Request,res: Response): Promise<void> 
{
  try 
  {
    const accessToken = await getAccessToken(req, res);
    if (!accessToken) return;

    const { productId, quantity } = req.body;

    if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) ||quantity < 0) 
      {
      res.status(400).json
      ({
        success: false,
        message:
          "Valid productId and non-negative integer quantity are required",
      });
      return;
      }

    const stock = await createStock(productId, quantity, accessToken);

    res.status(201).json
    ({
      success: true,
      data: stock,
    });
  } 
  catch (error) 
  {
    console.error("Failed to create stock:", error);
    res.status(500).json
    ({
      success: false,
      message: error instanceof Error ? error.message : "Failed to create stock",
    });
  }
}

// POST /api/stock/receive
export async function increaseStockController(req: Request,res: Response): Promise<void> {
  try 
  {
    const accessToken = await getAccessToken(req, res);
    if (!accessToken) return;

    const { productId, quantity } = req.body;

    if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) || quantity <= 0) 
      {
      res.status(400).json
      ({
        success: false,
        message: "Valid productId and positive integer quantity are required",
      });
      return;
      }

    const stock = await increaseStock(productId, quantity, accessToken);

    res.status(200).json
    ({
      success: true,
      data: stock,
    });
  } 
  catch (error) 
  {
    console.error("Failed to receive stock:", error);
    res.status(500).json
    ({
      success: false,
      message: error instanceof Error ? error.message : "Failed to receive stock",
    });
  }
}

// POST /api/stock/issue
export async function decreaseStockController(req: Request,res: Response): Promise<void> 
{
  try 
  {
    const accessToken = await getAccessToken(req, res);
    if (!accessToken) return;

    const { productId, quantity } = req.body;

    if (!Number.isInteger(productId) || productId <= 0 ||!Number.isInteger(quantity) ||quantity <= 0) 
      {
      res.status(400).json
      ({
        success: false,
        message: "Valid productId and positive integer quantity are required",
      });
      return;
      }

    const stock = await decreaseStock(productId, quantity, accessToken);

    res.status(200).json
    ({
      success: true,
      data: stock,
    });
  } 
  catch (error) 
  {
    console.error("Failed to issue stock:", error);
    res.status(500).json
    ({
      success: false,
      message: error instanceof Error ? error.message : "Failed to issue stock",
    });
  }
}

// PATCH /api/stock/quantity
export async function updateStockQuantityController(req: Request,res: Response): Promise<void> 
{
  try 
  {
    const accessToken = await getAccessToken(req, res);
    if (!accessToken) return;

    const { productId, quantity } = req.body;

    if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) || quantity < 0) 
      {
      res.status(400).json
      ({
        success: false,
        message:
          "Valid productId and non-negative integer quantity are required",
      });
      return;
      }

    const stock = await updateStockQuantity(productId,quantity,accessToken);

    res.status(200).json
    ({
      success: true,
      data: stock,
    });
  } 
  catch (error) 
  {
    console.error("Failed to update stock quantity:", error);
    res.status(500).json
    ({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update stock quantity",
    });
  }
}
