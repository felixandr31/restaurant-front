import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { OrderService } from 'src/app/services/data/order.service';
import { forkJoin } from 'rxjs';
import { BookingService } from 'src/app/services/data/booking.service';
import { StockService } from 'src/app/services/data/stock.service';


@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit, OnChanges {

  @Input() booking: any;
  @Input() bill: any = [];
  @Input() user: any;
  @Input() cachedStocks;
  @Output() onOrder = new EventEmitter();

  public orderSent: boolean = false;
  public orderTotal: number = 0;

  constructor(private orderService: OrderService,
    private bookingService: BookingService,
    private stockService: StockService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.booking.ordered) {
      this.computeTotal(this.bill);
    } else {
      this.computeTotal(this.booking.orders)
    }
  }

  ngOnInit() {
  }

  computeTotal(bill: any) {
    this.orderTotal = bill.reduce((acc, val) => {
      acc += (val.item.sellingPrice * val.quantity)
      return acc
    }, 0)
    console.log(this.orderTotal)
  }

  sendOrderToKitchen() {
    console.log('la facture', this.bill)
    // TODO : enregistrer la commande en BDD
    const queries = this.bill.map(line => this.orderService.postOrder(line))
    forkJoin(queries).subscribe(
      data => {
        this.orderSent = !this.orderSent;
        const orderIds = data.map((data: any) => data.body.id)
        this.bookingService.addOrderByIds(this.booking.id, orderIds).subscribe(
          data => {
            console.log("orders added to booking ?", data)
            this.onOrder.emit(data.body)
          }
        )
      }
    )
    const stockQueries = this.cachedStocks.map(box => this.stockService.updateStock(box.id, box))
    forkJoin(stockQueries).subscribe(
      data => {
        console.log("stock modified ?", data)
      }
    )
  }
}
