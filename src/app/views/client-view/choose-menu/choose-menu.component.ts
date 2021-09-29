import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { from, Observable } from 'rxjs';
import { share } from 'rxjs/operators'

@Component({
  selector: 'app-choose-menu',
  templateUrl: './choose-menu.component.html',
  styleUrls: ['./choose-menu.component.css']
})
export class ChooseMenuComponent implements OnInit, OnChanges {

  @Input() restaurant: any;
  @Input() bill: any;
  @Output() onItemAdded = new EventEmitter();
  @Output() onItemRemoved = new EventEmitter();

  public order = [];
  public cachedStocks;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)
    if (this.restaurant.id) {
      this.cachedStocks = this.restaurant.stocks;
      console.log('stocks', this.cachedStocks)
  }
}

  itemAdded(event) {
    this.onItemAdded.emit(event);
    const currentRecipe = this.restaurant.recipes.find(recipe => recipe.name === event)
    currentRecipe.ingredientsRecipe.forEach(ingR => {
      this.cachedStocks.forEach(stock => {
        if (stock.ingredient.id === ingR.ingredient.id) {
          stock.quantity -= ingR.quantity
        }
      })
    })
    this.cachedStocks = this.cachedStocks.slice(0)
  }

  itemRemoved(event) {
    this.onItemRemoved.emit(event)
    const currentRecipe = this.restaurant.recipes.find(recipe => recipe.name === event)
    currentRecipe.ingredientsRecipe.forEach(ingR => {
      this.cachedStocks.forEach(stock => {
        if (stock.ingredient.id === ingR.ingredient.id) {
          stock.quantity += ingR.quantity
        }
      })
    })
    this.cachedStocks = this.cachedStocks.slice(0)
  }
}
