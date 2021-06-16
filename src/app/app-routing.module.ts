import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './components/modules/clients/clients/clients.component';
import { NewClientComponent } from './components/modules/clients/new-client/new-client.component';
import { InvoiceByClientComponent } from './components/modules/invoices/invoice-by-client/invoice-by-client.component';
import { NewInvoiceComponent } from './components/modules/invoices/new-invoice/new-invoice.component';
import { NewProductComponent } from './components/modules/products/new-product/new-product.component';
import { ProductsComponent } from './components/modules/products/products/products.component';

const routes: Routes = [
  {path: 'clients', component: ClientsComponent},
  {path: 'clients/create', component: NewClientComponent},
  {path: 'invoice/:idClient', component: InvoiceByClientComponent},
  {path: 'invoice/create/:idClient', component: NewInvoiceComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/create', component: NewProductComponent},
  {path: '', redirectTo: 'clients', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
