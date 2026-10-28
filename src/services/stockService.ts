
import {
  getAllStock,
  getStockByProduct,
  addStock,
  receiveStock,
  issueStock,
  setStockQuantity,
} from "../repositories/stockRepository.js";

export async function fetchAllStock(accessToken: string) {
  return await getAllStock(accessToken);
}

export async function fetchStockByProduct(
  productId: number,
  accessToken: string
) {
  return await getStockByProduct(productId, accessToken);
}

export async function createStock(
  productId: number,
  quantity: number,
  accessToken: string
) {
  return await addStock(productId, quantity, accessToken);
}

export async function increaseStock(
  productId: number,
  quantity: number,
  accessToken: string
) {
  return await receiveStock(productId, quantity, accessToken);
}

export async function decreaseStock(
  productId: number,
  quantity: number,
  accessToken: string
) {
  return await issueStock(productId, quantity, accessToken);
}

export async function updateStockQuantity(
  productId: number,
  quantity: number,
  accessToken: string
) {
  return await setStockQuantity(productId, quantity, accessToken);
}
