import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.css']
})
export class HorizontalMenuComponent implements OnInit {

  menuItems = [
    { name: 'restaurantEdition', content: 'Edit Restaurant' },
    { name: 'graphics', content: 'Graphics' },
    { name: 'popularity', content: 'Popularity' },
    { name: 'recipes', content: 'Recipes' },
  ]

  @Output() onItemSelection = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectItem(event){
    console.log(event)
    this.onItemSelection.emit(event);
  }


}
