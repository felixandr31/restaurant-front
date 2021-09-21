import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit {

  @Input() restaurant: any;

  constructor() { }

  ngOnInit() {
    console.log('restaurant', this.restaurant)
  }

}
