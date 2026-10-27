
import type { Request, Response } from "express";
import {getAllProducts,createProductService/*updateProductService}*/ }from "../services/productService.js";
import { db } from "../config/db.js";

// GET: Fetch all products
export async function getProducts(req: Request,res: Response): Promise<void> 
{
  try 
  {
    const products = await getAllProducts();

    res.status(200).json
    ({
      success: true,
      data: products
    });
  } 
  catch (error: unknown) 
  {
    console.error("Failed to fetch products:", error);

    res.status(500).json
    ({
      success: false,
      message: "Unable to fetch products"
    });
  }
}

// POST: Create a product for an authenticated staff user
export async function createProductController(req: Request,res: Response): Promise<void>
 {
  try 
  {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) 
      {
        res.status(401).json
        ({
        success: false,
        message: "Missing Bearer access token"
        });
        
        return;
      }

    const accessToken = authHeader.substring(7);

    if (!accessToken || accessToken.split(".").length !== 3) 
      {
        res.status(401).json
        ({
          success: false,
          message: "Invalid access token format"
        });
        
        return;
      }

    // Validate the token with Supabase Auth
    const { data: userData, error: userError } = await db.auth.getUser(accessToken);

    console.log("Supabase user validated:",!userError && !!userData.user);
    console.log("Supabase auth error:",userError?.message ?? "none");

    if (userError || !userData.user) 
      {
        res.status(401).json
        ({
          success: false,
          message: "Invalid or expired access token"
        });
      
        return;
      }

    const { name, price } = req.body;

    if (typeof name !== "string" ||
        name.trim() === "" ||
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price < 0) 
      {
        res.status(400).json
        ({
          success: false,
          message:"Name must be a non-empty string and price must be a non-negative number"
        });
      
        return;
      }

    const product = await createProductService(name.trim(),price,accessToken);

    res.status(201).json
    ({
      success: true,
      data: product
    });
  } 
  
  catch (error: unknown) 
  {
    console.error("Failed to create product:", error);

    res.status(500).json
    ({
      success: false,
      message: "Unable to create product"
    });
  }
}

export async function updateStockController(req: Request,res: Response): Promise<void> 
{
   //IF accessToken is not available and starts with bearer:
      //return 401
   //IF staff not have the permission to update
      //return 403
   //check stock array exists
      //IF not exists
        //return 204
   //check each product in the array
   //IF the product id is invalid
      //return 400
   //IF stock value is negative
     //return 400
   //call updateStockService()
    //return (200),data
    
}
