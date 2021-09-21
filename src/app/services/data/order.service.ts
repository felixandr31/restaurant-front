import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:8080/backend-filrouge/order/'

  constructor(private http: HttpClient) { }

  postOrder(order: any) {
    const url = this.url + 'create'
    return this.http.post(url, order, {observe: 'response'});
  }
}
