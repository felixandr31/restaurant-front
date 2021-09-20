import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  addStockToRestaurant(restaurantId: any, tabId: String[]) {
    throw new Error('Method not implemented.');
  }
  private url = 'http://localhost:8080/backend-filrouge/stock/'
  
  constructor(private http: HttpClient) {}
  
  getStocks() {
    const url = this.url + 'stocks'
    return this.http.get(url, {observe: 'response'});
 }

 createStock(stock){
  const url = this.url + 'create'
  return this.http.post(url, stock, {observe: 'response'});
}
}