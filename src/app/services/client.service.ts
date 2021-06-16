import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../models/clients/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllClients() {
    return this.http.get(`${this.apiUrl}clients`);
  }

  createNewClient(client: Client) {
    return this.http.post(`${this.apiUrl}clients`, client);
  }
}
