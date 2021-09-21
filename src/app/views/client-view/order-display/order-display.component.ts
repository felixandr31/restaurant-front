import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { OrderService } from 'src/app/services/data/order.service';
import { forkJoin } from 'rxjs';
import { BookingService } from 'src/app/services/data/booking.service';


@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit, OnChanges {

  @Input() booking: any;
  @Input() bill: any = [];
  @Input() user: any;

  public orderSent: boolean = false;

  constructor(private orderService: OrderService,
    private bookingService: BookingService) { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit() {
  }

  sendOrderToKitchen() {
    console.log('lulz, tu as vraiment très très faim !')
    console.log('la facture', this.bill)
    // TODO : enregistrer la commande en BDD
    const queries = this.bill.map(line => this.orderService.postOrder(line))
    forkJoin(queries).subscribe(
      data => {
        this.orderSent = !this.orderSent;
        const orderIds = data.map((data: any) => data.body.id)
        console.log('post order data', data)
        this.bookingService.addOrderByIds(this.booking.id, orderIds).subscribe(
          data => {
            console.log("orders added to booking ?", data)
          }
        )
      }
    )
  }
}

