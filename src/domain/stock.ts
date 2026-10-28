export interface StockType {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export class Stock {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  created_at: string;
  updated_at: string;

  constructor(data: StockType) {
    this.id = data.id;
    this.product_id = data.product_id;
    this.name = data.name;
    this.quantity = data.quantity;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}