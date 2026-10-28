
import {
  getAllStock,
  getStockByProduct,
  addStock,
  receiveStock,
  issueStock,
  setStockQuantity,
} from "../repositories/stockRepository.js";

export async function fetchAllStock() {
  return await getAllStock();
}

export async function fetchStockByProduct(productId: number) {
  return await getStockByProduct(productId);
}

export async function createStock(productId: number, quantity: number) {
  return await addStock(productId, quantity);
}

export async function increaseStock(productId: number, quantity: number) {
  return await receiveStock(productId, quantity);
}

export async function decreaseStock(productId: number, quantity: number) {
  return await issueStock(productId, quantity);
}

export async function updateStockQuantity(
  productId: number,
  quantity: number
) {
  return await setStockQuantity(productId, quantity);
}
