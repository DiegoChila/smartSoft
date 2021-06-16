import { Invoice } from "./invoice";

export class NewInvoice {
  success: boolean;
  invoice: Invoice;
  errors: string[];

  constructor(success: boolean, invoice: Invoice, errors: string[]) {
    this.success = success;
    this.invoice = invoice;
    this.errors = errors;
  }
}
