
import { findAllProducts,createProduct } from "../repositories/productRepository.js";
import { Product } from "../domain/product.js";

export async function getAllProducts(): Promise<Product[]> {
  const products = await findAllProducts();

  return products.map((product) => new Product(product));
}
export async function createProductService(
  name: string,
  price: number
): Promise<Product> {
  const product = await createProduct(name, price);

  return new Product(product);
}