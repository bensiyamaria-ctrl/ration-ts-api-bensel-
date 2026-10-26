
import { supabase } from "../config/db.js";
import type { ProductType } from "../domain/product.js";

export async function findAllProducts(): Promise<ProductType[]> {
  const { data, error } = await supabase.rpc("get_all_products");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function createProduct(
  name: string,
  price: number
): Promise<ProductType> {
  const { data, error } = await supabase
    .from("products")
    .insert({ name, price })
    .select("id, name, price")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
