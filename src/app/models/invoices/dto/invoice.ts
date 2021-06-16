import { Detail } from "../../details/dto/detail";

export class Invoice {
  id: number;
  date: string;
  details: Detail[];
  total: number;

  constructor(id: number, date: string, details: Detail[]) {
    this.id = id;
    this.date = date;
    this.details = details;
    this.total = 0;
  }
}
