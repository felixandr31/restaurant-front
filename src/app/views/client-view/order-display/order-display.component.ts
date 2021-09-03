import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit, OnChanges {

  @Input() bill: any = [];

  public orderSent: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {
  }

  sendOrderToKitchen() {
    console.log('lulz, tu as vraiment très très faim !')
    // TODO : enregistrer la commande en BDD
    this.orderSent = !this.orderSent;
  }
}

