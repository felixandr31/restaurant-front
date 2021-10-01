import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choose-menu-item',
  templateUrl: './choose-menu-item.component.html',
  styleUrls: ['./choose-menu-item.component.css']
})
export class ChooseMenuItemComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() bill: any;
  @Input() cachedStocks: any;
  @Output() onItemAdd = new EventEmitter();
  @Output() onItemRemove = new EventEmitter();

  public line: any = {name: '', quantity: 0, sellingPrice: 0};
  public quantity = 0
  public availableItem: boolean = true;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.bill.length > 0 && this.bill.find(e => e.item.name == this.item.name)) {
      this.updateLine();
      this.quantity = this.line.quantity
    }
    if (this.cachedStocks.length) {
      this.availabilityCheck(this.cachedStocks)
      console.log('available ?', this.item.name, this.availableItem)
    }
  }


addItem(event) {
  this.onItemAdd.emit(event.target.value);
  console.log(event.target.value)
}

removeItem(event) {
  this.onItemRemove.emit(event.target.value);
}

  updateLine() {
    const lineUpdated = this.bill.find(e => e.item.name === this.item.name)
    return this.line = lineUpdated
  }

  availabilityCheck(stock) {
    this.availableItem = true;
    this.item.ingredientsRecipe.forEach(ingR => {
      stock.forEach(box => {
        if (box.ingredient.id === ingR.ingredient.id) {
          if(box.quantity < ingR.quantity) {
            console.log('missing ingredient', box.ingredient, box.quantity)
            return this.availableItem = false
          }
        }
      })
    })
  }
}
