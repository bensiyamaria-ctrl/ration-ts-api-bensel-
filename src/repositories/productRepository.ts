
import { db } from "../config/db.js";
import { createUserDb } from "../config/userDb.js";
import type { ProductType } from "../domain/product.js";

// GET: Fetch all products using the database function
export async function findAllProducts(): Promise<ProductType[]> {
    const { data, error } = await db.rpc("get_all_products");

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

// POST: Create a product as an authenticated user
export async function createProduct(
    name: string,
    price: number,
    accessToken: string
): Promise<ProductType> {
    const userDb = createUserDb(accessToken);

    const { data, error } = await userDb
        .from("products")
        .insert({ name, price })
        .select("id, name, price")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
