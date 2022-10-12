import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(public http: HttpClient) {}
  getData() {
    return this.http.get<any>(
      'https://631995d78e51a64d2be75c90.mockapi.io/api/array'
    );
  }
}
