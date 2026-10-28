import { db } from "../config/db.js";
import { StockType } from "../domain/stock.js";

// Get all stock records
export async function getAllStock(): Promise<StockType[]> {
  const { data, error } = await db.rpc("get_all_stock");

  if (error) {
    throw new Error(error.message);
  }

  return data as StockType[];
}

// Get stock for one product
export async function getStockByProduct(
  productId: number
): Promise<StockType[]> {
  const { data, error } = await db.rpc("get_stock_by_product", {
    p_product_id: productId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as StockType[];
}

// Add an initial stock record
export async function addStock(
  productId: number,
  quantity: number
): Promise<StockType> {
  const { data, error } = await db.rpc("add_stock_record", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as StockType;
}

// Receive stock: increase existing quantity
export async function receiveStock(
  productId: number,
  quantity: number
): Promise<StockType> {
  const { data, error } = await db.rpc("receive_stock", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as StockType;
}

// Issue stock: decrease existing quantity
export async function issueStock(
  productId: number,
  quantity: number
): Promise<StockType> {
  const { data, error } = await db.rpc("issue_stock", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as StockType;
}

// Set an exact stock quantity
export async function setStockQuantity(
  productId: number,
  quantity: number
): Promise<StockType> {
  const { data, error } = await db.rpc("set_stock_quantity", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as StockType;
}