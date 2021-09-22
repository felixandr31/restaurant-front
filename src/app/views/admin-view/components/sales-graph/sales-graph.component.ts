import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BookingService } from 'src/app/services/data/booking.service';
import { forkJoin } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit, OnChanges {

  @Input() restaurant: any;
  private count: number = 0;
  public recipesSales: any = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    // console.log('restaurant', this.restaurant)
    // this.getRecipesSales();
  }

  ngOnChanges() {
    this.getRecipesSales();
  }

  getRecipesSales() {
    console.log('count', this.count)
    this.count++
    const queries = this.restaurant.tables.map(table => this.bookingService.getBookingByTable(table.id));

    forkJoin(queries).subscribe(
      data => {
        let temp1 = {};
        let temp2 = [];
        const filtered: any = data.filter((data: any) => data.body.length)
        console.log('filtered', filtered)
        filtered.forEach(bookings => {
          bookings.body.map(booking => {
            booking.orders.map(order => {
              // this.recipesSales[order.item.name] ?
              // this.recipesSales[order.item.name].quantity += order.quantity :
              // this.recipesSales[order.item.name] = {
              //   name: order.item.name,
              //   itemId: order.item.id,
              //   craftingPrice: order.item.craftingPrice,
              //   sellingPrice: order.item.sellingPrice,
              //   quantity: order.quantity
              // }
              temp1[order.item.name] ?
              temp1[order.item.name].quantity += order.quantity :
              temp1[order.item.name] = {
                name: order.item.name,
                itemId: order.item.id,
                craftingPrice: order.item.craftingPrice,
                sellingPrice: order.item.sellingPrice,
                quantity: order.quantity
              }
            })
          })
        })
        Object.keys(temp1).map(key => {
          temp2.push(temp1[key]);
        })
        // this.recipesSales = Object.assign([], ...this.recipesSales)
        this.recipesSales = temp2;

        // this.recipesSales = [...this.recipesSales, ...temp]
        console.log('recipe sales', {...this.recipesSales})
        console.log('size', this.recipesSales.length)
      }
    )
  }

}
