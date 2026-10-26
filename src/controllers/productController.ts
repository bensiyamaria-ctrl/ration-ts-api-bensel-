
import type { Request, Response } from "express";
import { getAllProducts,createProductService } from "../services/productService.js";

export async function getProducts(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error: unknown) {
    console.error("Failed to fetch products:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch products"
    });
  }
}

export async function createProductController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Missing Bearer access token"
      });
      return;
    }

    const accessToken = authHeader.substring(7);

    if (!accessToken || accessToken.split(".").length !== 3) {
      res.status(401).json({
        success: false,
        message: "Invalid access token format"
      });
      return;
    }

    const { name, price } = req.body;

    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "Name must be a non-empty string and price must be a non-negative number"
      });
      return;
    }

    const product = await createProductService(
      name.trim(),
      price,
      accessToken
    );

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error: unknown) {
    console.error("Failed to create product:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create product"
    });
  }
}
