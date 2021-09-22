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
    console.log('la facture dans choose item', this.bill)
    console.log('la ligne avant le update', this.line)
    console.log('item', this.item)
    if (this.bill.length > 0 && this.bill.find(e => e.item.name == this.item.name)) {
      this.updateLine();
      console.log('la ligne du chef, ', this.line)
      this.quantity = this.line.quantity
      console.log('la quantité', this.quantity)
    }
  }


addItem(event) {
  console.log('item add from below', event.target.value)
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
