import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-menu-item',
  templateUrl: './choose-menu-item.component.html',
  styleUrls: ['./choose-menu-item.component.css']
})
export class ChooseMenuItemComponent implements OnInit {

  @Input() item: any;
  @Output() onItemAdd = new EventEmitter();
  @Output() onItemRemove = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addItem(event) {
    this.onItemAdd.emit(event.target.value);
    console.log('item ajouté', event)
  }

  removeItem(event) {
    this.onItemRemove.emit(event.target.value);
    console.log('item enlevé', event)
  }

}
