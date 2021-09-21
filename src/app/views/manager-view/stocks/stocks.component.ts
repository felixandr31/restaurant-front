import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientService } from 'src/app/services/data/ingredient.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { StockService } from 'src/app/services/data/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

@Input() managerRestaurant: any;
@Input() ingredients: any;

// @Output() refreshTablesAfterSubmit = new EventEmitter()
// @Input() restaurantId;
 isDisplayIngredient = false;
 public stocks: any[]

// dynamicForm: FormGroup;
// submitted: boolean = false;
// restaurant: any;

// emptyStock: any = {
//   name: "",
//   capacity: ""
// }

// groupValidator = {
//   name: ['', Validators.required],
//   quatity: ['', Validators.required],
//   purchasePrice: ['', Validators.required]

// }
//   isDisplayStock: boolean;

constructor(private formBuilder: FormBuilder, private stockService: StockService, private ingredientService: IngredientService) { }

  ngOnInit() {
   //this.stocks = this.managerRestaurant.stocks
  //  this.dynamicForm = this.formBuilder.group(this.groupValidator)
   this.stocks = Object.assign([], this.managerRestaurant.stocks)
   //this.stocks = {...this.managerRestaurant.stocks}// spread operator
   console.log(this.stocks)
  }

  onSubmit() {
    // this.submitted = true;
    // if (this.dynamicForm.invalid) {
    //   return;
    // }
    // let newStock = {
    //   ...this.emptyStock,
    //   name: this.dynamicForm.controls.name.value,
    //   quatity: parseInt(this.dynamicForm.controls.quatityty.value),
    //   purchasePrice: parseInt(this.dynamicForm.controls.purchasePrice.value),
    }

    // this.stockService.createStock(newStock).subscribe(
    //   data => {
    //     newStock = data.body;
    //     const tabId: String[] = [newStock.id];
    //     this.stockService.addStockToRestaurant(this.restaurantId, tabId).subscribe(
    //       data => {
    //         console.log(data);
    //         this.refreshTablesAfterSubmit.emit();
    //         this.dynamicForm.reset
    //         this.isDisplayIngredient= false
    //       },
    //       err => {
    //         console.log('erreur', err)
    //       }
    //     )
    //   }

    // )
  //}
  isDisplay(){
    this.isDisplayIngredient = !this.isDisplayIngredient    
 }

}
