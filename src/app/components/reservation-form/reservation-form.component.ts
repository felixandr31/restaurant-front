import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  @Input() restaurant: any;
  @Input() client: any;

  constructor() { }

  ngOnInit() {
  }

}
