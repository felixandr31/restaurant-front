import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private url = 'http://localhost:8080/backend-filrouge/booking/'

  constructor(private http: HttpClient) { }

  public getBookingByTable(tableId) {
    const url = this.url + tableId
    return this.http.get(url, { observe: 'response' })
  }

  public postBooking(booking) {
    const url = this.url + 'create'
    return this.http.post(url, booking, {observe: 'response'})
  }

  public getBookingById(bookingId) {
    const url = this.url + 'bookings/' + bookingId
    return this.http.get(url, {observe: 'response'})
  }

 

}
