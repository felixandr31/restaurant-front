import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-menu',
  templateUrl: './choose-menu.component.html',
  styleUrls: ['./choose-menu.component.css']
})
export class ChooseMenuComponent implements OnInit {

  @Input() restaurant: any;
  @Output() onItemAdded = new EventEmitter();
  @Output() onItemRemoved = new EventEmitter();

  public order = [];

  constructor() { }

  ngOnInit() {
  }

  itemAdded(event) {
    this.onItemAdded.emit(event);
    console.log('menu says item added', event)
  }

  itemRemoved(event) {
    this.onItemRemoved.emit(event)
    console.log('menu says item removed', event)
  }

}
