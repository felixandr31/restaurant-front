import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { link } from 'fs';

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() addToOrder: any;
  @Output() addToOrderChange = new EventEmitter();
  @Input() removeFromOrder: any;

  public bill: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.addToBill();
  }

  ngOnInit() {
  }


  ngAfterViewChecked() {
    this.addToOrderChange.emit(this.addToOrder)
  }

  addToBill() {
    if (!this.addToOrder) {
      return;
    } else if (this.bill.length < 1) {
      this.bill.push({ name: this.addToOrder, quantity: 1 })
    } else {
      this.bill.find(line => line.name === this.addToOrder) ?
        this.bill.filter(line => line.name === this.addToOrder).map(line => line.quantity += 1) :
        this.bill.push({ name: this.addToOrder, quantity: 1 });
    }
    console.log('la facture', this.bill);
  }
}

