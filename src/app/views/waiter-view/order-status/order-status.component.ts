import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
@Input() restaurant: any
  constructor() { }


  ngOnInit() {
    console.log(this.restaurant)
    
  }

}


