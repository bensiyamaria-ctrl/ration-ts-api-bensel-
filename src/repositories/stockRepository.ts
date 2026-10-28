
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../config/database.types.js";
import type { StockType } from "../domain/stock.js";

function getUserDb(accessToken: string) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase configuration");
  }

  return createClient<Database>(url, key, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

export async function getAllStock(accessToken: string): Promise<StockType[]> {
  const db = getUserDb(accessToken);
  const { data, error } = await db.rpc("get_all_stock");

  if (error) throw new Error(error.message);
  return data as StockType[];
}

export async function getStockByProduct(
  productId: number,
  accessToken: string
): Promise<StockType[]> {
  const db = getUserDb(accessToken);
  const { data, error } = await db.rpc("get_stock_by_product", {
    p_product_id: productId,
  });

  if (error) throw new Error(error.message);
  return data as StockType[];
}

export async function addStock(
  productId: number,
  quantity: number,
  accessToken: string
): Promise<StockType> {
  const db = getUserDb(accessToken);
  const { data, error } = await db.rpc("add_stock_record", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) throw new Error(error.message);
  return data as StockType;
}

export async function receiveStock(
  productId: number,
  quantity: number,
  accessToken: string
): Promise<StockType> {
  const db = getUserDb(accessToken);
  const { data, error } = await db.rpc("receive_stock", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) throw new Error(error.message);
  return data as StockType;
}

export async function issueStock(
  productId: number,
  quantity: number,
  accessToken: string
): Promise<StockType> {
  const db = getUserDb(accessToken);
  const { data, error } = await db.rpc("issue_stock", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) throw new Error(error.message);
  return data as StockType;
}

export async function setStockQuantity(
  productId: number,
  quantity: number,
  accessToken: string
): Promise<StockType> {
  const db = getUserDb(accessToken);
  const { data, error } = await db.rpc("set_stock_quantity", {
    p_product_id: productId,
    p_quantity: quantity,
  });

  if (error) throw new Error(error.message);
  return data as StockType;
}
