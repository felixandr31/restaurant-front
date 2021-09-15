import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
//@Input() managerRestaurant: any;
@Input() stocks: any;
//private stocks:any; 
  constructor() { }

  ngOnInit() {
   //this.stocks = this.managerRestaurant.stocks
  console.log(this.stocks)
  }

}
