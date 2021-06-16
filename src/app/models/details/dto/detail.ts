import { Invoice } from "../../invoices/dto/invoice";
import { Product } from "../../products/dto/product";

export class Detail {
  id: number;
  invoice: Invoice;
  price: number;
  product: Product;
  quantity: number;

  constructor(id: number, invoice: Invoice, price: number, product: Product, quantity: number) {
    this.id = id;
    this.invoice = invoice;
    this.price = price;
    this.product = product;
    this.quantity = quantity;
  }
}
