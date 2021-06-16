import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddDetails } from '../models/details/add-details';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createNewDetails(addDetails: AddDetails) {
    return this.http.post(`${this.apiUrl}details`, addDetails);
  }
}
