import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BookingObsService {

  bookingMessage = new BehaviorSubject<string>('coucou');

  constructor() { }

  getBookingMessage(): Observable<string> {
    return this.bookingMessage.asObservable();
  }

  updateBookingMessage(message: string) {
    this.bookingMessage.next(message);
    console.log('message from service', message)
  }
}
