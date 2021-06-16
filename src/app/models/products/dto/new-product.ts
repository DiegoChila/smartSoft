import { Product } from "./product";

export class NewProduct {
  success: boolean;
  product: Product;
  errors: string[];

  constructor(success: boolean, product: Product, errors: string[]) {
    this.success = success;
    this.product = product;
    this.errors = errors;
  }
}
