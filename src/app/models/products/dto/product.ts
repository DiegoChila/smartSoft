export class Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  increment: number;

  constructor(id: number, name: string, price: number, stock: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.increment = 0;
  }
}
