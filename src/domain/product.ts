
export type ProductType = {
  id: number;
  name: string;
  price: number;
};

export class Product {
  id: number;
  name: string;
  price: number;

  constructor(product: ProductType) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
  }
}
