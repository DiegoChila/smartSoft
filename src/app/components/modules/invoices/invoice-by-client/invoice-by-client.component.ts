import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoices/dto/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-by-client',
  templateUrl: './invoice-by-client.component.html',
  styleUrls: ['./invoice-by-client.component.css']
})
export class InvoiceByClientComponent implements OnInit {

  invoices: Invoice[] = new Array;
  idClient: any;
  onLoad: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoad = true;
    this.idClient = this.activatedRoute.snapshot.params.idClient;
    this.invoiceService.getInvoicesByClient(this.idClient).subscribe(
      (response: any) => {
        this.invoices = response;
        this.invoices.forEach(invoice => {
          invoice.date = moment(invoice.date).format('ll');
          invoice.total = 0;
          invoice.details.forEach(detail => {
            invoice.total = invoice.total + detail.price;
          });
        });
        this.onLoad = false;
      },
      (error: any) => {
        this.viewError('');
        this.onLoad = false;
      }
    );
  }

  createNewInvoice() {
    this.router.navigateByUrl(`invoice/create/${this.idClient}`);
  }

  viewError(errors: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      html: `${errors}`,
    })
  }
}
