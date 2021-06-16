import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { LoaderComponent } from './components/ui/loader/loader.component';
import { ClientsComponent } from './components/modules/clients/clients/clients.component';
import { ProductsComponent } from './components/modules/products/products/products.component';
import { ClientService } from './services/client.service';
import { DetailService } from './services/detail.service';
import { InvoiceService } from './services/invoice.service';
import { ProductService } from './services/product.service';
import { NewClientComponent } from './components/modules/clients/new-client/new-client.component';
import { NewProductComponent } from './components/modules/products/new-product/new-product.component';
import { InvoiceByClientComponent } from './components/modules/invoices/invoice-by-client/invoice-by-client.component';
import { NewInvoiceComponent } from './components/modules/invoices/new-invoice/new-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ClientsComponent,
    ProductsComponent,
    NewClientComponent,
    NewProductComponent,
    InvoiceByClientComponent,
    NewInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule
  ],
  providers: [
    ClientService,
    DetailService,
    InvoiceService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
