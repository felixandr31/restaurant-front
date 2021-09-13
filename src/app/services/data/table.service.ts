import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class TableService {

  private url = 'http://localhost:8080/backend-filrouge/table/'

  constructor(private http: HttpClient) { }

  getTables() {
    const url = this.url + 'tables'
    return this.http.get(url, {observe:'response'});
  }

  
}
