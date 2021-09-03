import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit, OnChanges {

  @Input() bill: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {
  }
}

