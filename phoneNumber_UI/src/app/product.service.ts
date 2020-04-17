import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  message = '';
  constructor(private http: HttpClient) { }

  getData(page, limit, phoneNumber) {
    const payload = {
      'page': page,
      'limit': limit,
      'phoneNumber': phoneNumber
    };
    return this.http.post('http://localhost:4200/api/javainuse/phoneNumberData', payload);
  }
}
