import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input() user: any;
  @Output() onReservationSelection = new EventEmitter();

  public reservationsId: any = []
  public reservations: any = []

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.reservationsId = this.user.bookings;
    const queries = this.reservationsId.map(resa => this.bookingService.getBookingById(resa))

    forkJoin(queries).subscribe(
      (data: any) => {
        this.reservations = data.map(d => d.body)
      }
    )
  }

  reservationSelected(event) {
    this.onReservationSelection.emit(event.target.value)
  }
}
