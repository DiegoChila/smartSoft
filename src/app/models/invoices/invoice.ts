export class Invoice {
  idClient: number;
  date: string;

  constructor() {
    this.date = '';
    this.idClient = 0;
  }

  setData(idClient: number, date: string) {
    this.date = date;
    this.idClient = idClient;
  }
}
