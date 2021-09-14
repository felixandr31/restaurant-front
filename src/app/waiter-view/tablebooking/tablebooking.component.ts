import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';

@Component({
  selector: 'app-tablebooking',
  templateUrl: './tablebooking.component.html',
  styleUrls: ['./tablebooking.component.css']
})
export class TablebookingComponent implements OnInit {

  public tables: any = []

  constructor(private bookingService :BookingService) { }

  

  ngOnInit() {
    
  }


  
 

}
    

