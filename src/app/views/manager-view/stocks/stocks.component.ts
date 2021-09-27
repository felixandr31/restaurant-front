import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { IngredientService } from 'src/app/services/data/ingredient.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { StockService } from 'src/app/services/data/stock.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnChanges {
  // @Output() refreshIngredientSubmited = new EventEmitter()
  @Output() refreshStockSubmited = new EventEmitter()
  @Input() managerRestaurant: any;
  @Input() ingredients: any;



  isDisplayIngredient = false;
  isDisplayStock = false;
  public stocks: any[];
  addingIngredient: any;

  dynamicForm: FormGroup;
  stockDynamicForm: FormGroup;
  submitted: boolean = false;


  emptyIngredient: any = {
    name: "",
    purchasePrice: ""
  }

  groupValidator = {
    name: ['', Validators.required],
    purchasePrice: ['', Validators.required]
  }
  stockGroupValidator = {
    ingredient: ['', Validators.required],
    id: ['', Validators.required],
    quantity: ['', Validators.required]
  }


  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService, private stockService: StockService, private ingredientService: IngredientService) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    this.refreshStock()
  }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group(this.groupValidator);
    this.stockDynamicForm = this.formBuilder.group(this.stockGroupValidator);

    //  this.stocks = Object.assign([], this.managerRestaurant.stocks) //this.stocks = {...this.managerRestaurant.stocks}// spread operator
    console.log(this.stocks)
  }


  onSubmit() {
    let currentStock: any;
    this.submitted = true;
    let isStockExisting: boolean = false;
  
    let newStock = {
      ingredient: this.addingIngredient,
      quantity: parseFloat(this.stockDynamicForm.controls.quantity.value),
    }

      for(let stock of this.managerRestaurant.stocks){
        if (newStock.ingredient.id === stock.ingredient.id){
          isStockExisting=true
          currentStock = stock;
        }
      }


    console.log(this.stockDynamicForm.controls.id.value)

    if(!isStockExisting){
    this.stockService.createStock(newStock).subscribe(
      data => {
        this.restaurantService.addStockToRestaurant(this.managerRestaurant.id, [data.body["id"]]).subscribe(
          data => {
            this.refreshStockSubmited.emit()
            this.isDisplayStock = false
          }
        )
        // this.refreshStockSubmited.emit()
        // console.log(data)
      }

    )}
  else{
    currentStock = {
    ...currentStock,
    quantity: parseInt(currentStock.quantity) + parseInt(this.stockDynamicForm.controls.quantity.value)
  }
    this.stockService.updateStock(currentStock.id, currentStock).subscribe(
      data=>{

        this.refreshStockSubmited.emit()
        this.isDisplayStock = false
        // this.restaurantService.addStockToRestaurant(this.managerRestaurant.id, [newStock.ingredient.id]).subscribe(
        //   data => {
        //     this.refreshStockSubmited.emit()
        //     this.isDisplayStock = false
        //   }
        // )
      }
    )
  }
  }
  isDisplay() {
    this.isDisplayIngredient = !this.isDisplayIngredient
  }
  addStock(ingredient) {
    this.addingIngredient = ingredient
    this.stockDynamicForm.patchValue({
      id: this.addingIngredient.id,
      name: this.addingIngredient.name
    })

    this.isDisplayStock = true



  }
  refreshStock() {
    this.stocks = Object.assign([], this.managerRestaurant.stocks)
  }
}
