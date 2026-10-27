
export type ProductStructure = 
{
  id: number;
  name: string;
  price: number;
};

export class Product 
{
  id: number;
  name: string;
  price: number;

  constructor(product: ProductStructure) 
  {
    this.id = product.id;                
    this.name = product.name;
    this.price = product.price;
  }
}
