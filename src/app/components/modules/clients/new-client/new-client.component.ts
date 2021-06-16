import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/clients/client';
import { NewClient } from 'src/app/models/clients/dto/new-client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {

  client: Client = new Client();
  onLoad: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onLoad = true;
    this.clientService.createNewClient(this.client).subscribe(
      (response: any) => {
        const newClient: NewClient = response;
        if (newClient.success) {
          Swal.fire({
            icon: 'success',
            title: 'Cliente creado',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl('clients');
        } else {
          let errors: string = '';
          newClient.errors.forEach(errorElement => {
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
