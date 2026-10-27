
import { findAllProducts,createProduct } from "../repositories/productRepository.js";
import { Product } from "../domain/product.js";

export async function getAllProducts(): Promise<Product[]> 
{
  const products = await findAllProducts();

  return products.map((product) => new Product(product));
}
export async function createProductService(name: string,price: number,accessToken: string): Promise<Product> 
{
  const product = await createProduct(name, price,accessToken);

  return new Product(product);
}
/*
export async function updateProductService(
  id: number,
  name: string,
  price: number,
  quantity: number,
  accessToken: string
): Promise<Product> {
  const upProduct = await updateProduct(id,name,price,quantity,accessToken);

  return new Product(upProduct);
}*/