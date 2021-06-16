import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/clients/dto/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = new Array;
  onLoad: boolean = false;

  dataSource: MatTableDataSource<Client> = new MatTableDataSource(this.clients);
  displayedColumns = ['name', 'birthday', 'address', 'tel', 'email', 'invoices', 'actions'];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.onLoad = true;
    this.clientService.getAllClients().subscribe(
      (response: any) => {
        this.clients = response;
        this.clients.forEach(client => {
          client.birthday = moment(client.birthday).format('ll');
        });
        this.dataSource.data = this.clients;
        this.onLoad = false;
      },
      (error: any) => {
        this.viewError('');
        this.onLoad = false;
      }
    )
  }

  viewError(errors: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error',
      html: `${errors}`,
    })
  }

}
