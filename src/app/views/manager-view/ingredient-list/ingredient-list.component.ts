import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

@Output() onselectIngredient = new EventEmitter()
  public ingredients: any
  constructor() { }

  ngOnInit() {
  }
  selectIngredient(event){
 this.onselectIngredient.emit(event.target.value)
  }
}
