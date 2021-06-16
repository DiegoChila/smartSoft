import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDetails } from 'src/app/models/details/add-details';
import { NewDetail } from 'src/app/models/details/new-detail';
import { NewDetail as NewDetailDto } from 'src/app/models/details/dto/new-detail';
import { NewInvoice } from 'src/app/models/invoices/dto/new-invoice';
import { Invoice } from 'src/app/models/invoices/invoice';
import { Invoice as InvoiceDto } from 'src/app/models/invoices/dto/invoice';
import { Product } from 'src/app/models/products/dto/product';
import { DetailService } from 'src/app/services/detail.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {

  invoice: Invoice = new Invoice();
  products: Product[] = new Array;
  details: NewDetail[] = new Array;
  idClient: any;
  haveDetails: boolean = false;
  newInvoice: InvoiceDto = new InvoiceDto(0, '', new Array);
  onLoad: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private detailService: DetailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.onLoad = true;
    this.idClient = this.activatedRoute.snapshot.params.idClient;
    const date = new Date();
    let month = date.getMonth();
    let dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (month<10) {
      dateString = `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}`;
    }
    this.invoice.setData(this.idClient, dateString.toString());
    this.invoiceService.createNewInvoice(this.invoice).subscribe(
      (response: any) => {
        const newInvoice: NewInvoice = response;
        if (newInvoice.success) {
          this.newInvoice = newInvoice.invoice;
          this.getProducts();
        } else {
          let errors: string = '';
          newInvoice.errors.forEach(errorElement => {
            errors += `${errorElement} <br>`;
          });
          this.viewError(errors);
        }
        this.onLoad = false;
      },
      (error) => {
        this.viewError('');
        this.onLoad = false;
      }
    );
  }

  getProducts() {
    this.onLoad = true;
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response;
        this.products.forEach(product => {
          product.increment = 0;
        });
        const newDetail: NewDetail = new NewDetail();
        this.details.push(newDetail);
        this.onLoad = false;
      },
      (error: any) => {
        this.viewError('');
        this.onLoad = false;
      }
    );
  }

  validate(detail: NewDetail) {
    detail.idProduct = parseInt(detail.idProduct, 10);
    let newProduct = true;
    let correctQuantity = true;
    this.details.forEach(detailItem => {
      if (detailItem.idProduct == detail.idProduct && detailItem.finish) newProduct = false;
      const productSelect = this.products.filter(product => product.id == detail.idProduct)[0];
      if (detail.quantity > productSelect.stock) correctQuantity = false;
    });
    if (newProduct && correctQuantity) {
      this.haveDetails = true;
      detail.finish = true;
      const newDetail: NewDetail = new NewDetail();
      this.details.push(newDetail);
    } else if (!newProduct) {
      this.viewError('Producto ya registrado');
    } else if (!correctQuantity) {
      this.viewError('cantidad excede el stock');
    } else {
      this.viewError('');
    }
  }

  createInvoice() {
    this.onLoad = true;
    let detailsFinish: NewDetail[] = new Array;
    this.details.forEach(detail => {
      if (detail.finish) detailsFinish.push(detail);
    });
    const addDetails: AddDetails = new AddDetails(this.newInvoice.id, detailsFinish);
    this.detailService.createNewDetails(addDetails).subscribe(
      (response: any) => {
        const newDetail: NewDetailDto = response;
        if (newDetail.success) {
          Swal.fire({
            icon: 'success',
            title: 'Factura creada',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl(`invoice/${this.idClient}`);
        } else {
          let errors: string = '';
          newDetail.errors.forEach(errorElement => {
            errors += `${errorElement} <br>`;
          });
          this.viewError(errors);
          this.onLoad = false;
        }
      },
      (error: any) => {
        this.viewError('');
        this.onLoad = false;
      }
    );
  }

  viewError(errors: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      html: `${errors}`,
    })
  }
}
