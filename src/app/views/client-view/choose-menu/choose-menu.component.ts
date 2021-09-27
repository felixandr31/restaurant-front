import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-menu',
  templateUrl: './choose-menu.component.html',
  styleUrls: ['./choose-menu.component.css']
})
export class ChooseMenuComponent implements OnInit {

  @Input() restaurant: any;
  @Input() bill: any;
  @Output() onItemAdded = new EventEmitter();
  @Output() onItemRemoved = new EventEmitter();

  public order = [];

  public stocks = []

  constructor() { }

  ngOnInit() {
  }

  itemAdded(event) {
    this.onItemAdded.emit(event);
  }

  itemRemoved(event) {
    this.onItemRemoved.emit(event)
  }

}
