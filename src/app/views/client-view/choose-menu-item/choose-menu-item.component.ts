import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-menu-item',
  templateUrl: './choose-menu-item.component.html',
  styleUrls: ['./choose-menu-item.component.css']
})
export class ChooseMenuItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() bill: any;
  @Output() onItemAdd = new EventEmitter();
  @Output() onItemRemove = new EventEmitter();

  public line: any = {name: '', quantity: 0, sellingPrice: 0};
  public quantity = 0

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.bill.length > 0 && this.bill.find(e => e.item.name == this.item.name)) {
      this.updateLine();
      this.quantity = this.line.quantity
    }
  }


addItem(event) {
  this.onItemAdd.emit(event.target.value);
}

removeItem(event) {
  this.onItemRemove.emit(event.target.value);
}

  updateLine() {

    const lineUpdated = this.bill.find(e => e.item.name === this.item.name)
    return this.line = lineUpdated
  }
}
