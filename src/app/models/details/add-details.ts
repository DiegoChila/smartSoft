import { NewDetail } from "./new-detail";

export class AddDetails {
  idInvoice: number;
  details: NewDetail[];

  constructor(idInvoice: number, details: NewDetail[]) {
    this.idInvoice = idInvoice;
    this.details = details;
  }
}
