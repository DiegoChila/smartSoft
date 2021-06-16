import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewProduct } from 'src/app/models/products/dto/new-product';
import { Product } from 'src/app/models/products/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  product: Product = new Product();
  onLoad: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onLoad = true;
    this.productService.createNewProduct(this.product).subscribe(
      (response: any) => {
        const newProduct: NewProduct = response;
        if (newProduct.success) {
          Swal.fire({
            icon: 'success',
            title: 'Producto creado',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('products');
        } else {
          let errors: string = '';
          newProduct.errors.forEach(errorElement => {
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
