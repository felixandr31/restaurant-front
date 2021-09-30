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
  @Input() cachedStocks;
  @Output() onItemAdded = new EventEmitter();
  @Output() onItemRemoved = new EventEmitter();

  public order = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)
    // if (this.restaurant.id) {
    //   this.cachedStocks = this.restaurant.stocks;
    //   console.log('stocks', this.cachedStocks)
  // }
}

  itemAdded(event) {
    this.onItemAdded.emit(event);
  }

  itemRemoved(event) {
    this.onItemRemoved.emit(event)
  }
}
