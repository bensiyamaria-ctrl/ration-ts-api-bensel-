
import { db } from "../config/db.js";
import { createUserDb } from "../config/userDb.js";
import type { ProductStructure } from "../domain/product.js";

// GET: Fetch all products
export async function findAllProducts(): Promise<ProductStructure[]> 
{
    const { data, error } = await db.rpc("get_all_products");

    if (error) 
      {
        console.error("Fetch products error:", error.message);
        throw new Error(error.message);
      }

    return data;
}

// POST: Create a product as an authenticated user
export async function createProduct(name: string,price: number,accessToken: string): Promise<ProductStructure> 
{
    const userDb = createUserDb(accessToken);

    const { data: isStaff, error: staffError } = await userDb.rpc("is_current_user_staff");

    console.log("Is authenticated user staff?", isStaff);
    console.log("Staff check error:", staffError?.message ?? "none");

    const { data, error } = await userDb
        .from("products")
        .insert({ name, price })
        .select("id, name, price")
        .single();

    if (error) 
      {
        console.error("Supabase insert error:", error);
        throw new Error(error.message);
      }

    return data;
}


//create UpdateStock fuction(parameter)
 //connect with the database
 //if updated
  //return updated successfully
//else
  //return error
 


 



