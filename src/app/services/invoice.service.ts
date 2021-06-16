import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoices/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInvoicesByClient(idClient: any) {
    return this.http.get(`${this.apiUrl}invoices/${idClient}`);
  }

  createNewInvoice(invoice: Invoice) {
    return this.http.post(`${this.apiUrl}invoices`, invoice);
  }
}
