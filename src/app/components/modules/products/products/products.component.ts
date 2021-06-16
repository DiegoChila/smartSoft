import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IncrementStock } from 'src/app/models/products/dto/increment-stock';
import { NewProduct } from 'src/app/models/products/dto/new-product';
import { Product } from 'src/app/models/products/dto/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = new Array;
  onLoad: boolean = false;

  dataSource: MatTableDataSource<Product> = new MatTableDataSource(this.products);
  displayedColumns = ['name', 'price', 'stock', 'increment'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.onLoad = true;
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response;
        this.products.forEach(product => {
          product.increment = 0;
        });
        this.dataSource.data = this.products;
        this.onLoad = false;
      },
      (error: any) => {
        this.viewError('');
        this.onLoad = false;
      }
    );
  }

  incrementStock(id: number, increment: number) {
    this.onLoad = true;
    const incremetStockObject: IncrementStock = new IncrementStock(id, increment);
    this.productService.incrementProduct(incremetStockObject).subscribe(
      (response: any) => {
        const incrementProduct: NewProduct = response;
        if (incrementProduct.success) {
          this.products.forEach(product => {
            if (product.id == incrementProduct.product.id) {
              product.stock = incrementProduct.product.stock;
              product.increment = 0;
            }
          });
        } else {
          let errors: string = '';
          incrementProduct.errors.forEach(errorElement => {
            errors += `${errorElement} <br>`;
          });
          this.viewError(errors);
        }
        this.onLoad = false;
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
