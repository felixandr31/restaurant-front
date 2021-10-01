import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  @Input() showView: any;
  @Output() onSubViewSelection = new EventEmitter();

  public menuClient: any = [
    { name: 'find', content: 'Restaurants' },
    { name: 'friends', content: 'Friends' },
    { name: 'eat', content: 'Reservations' }
  ]

  public menuManager: any = [
    { name: 'homePage', content: 'Home page' },
    { name: 'transactions', content: 'Transactions' },
    { name: 'recipes', content: 'Recipes' },
    { name: 'stocks', content: 'Stocks' },
    { name: 'employees', content: 'Employees' }
  ]

  public menuAdmin: any = [
    { name: 'restaurants', content: 'Restaurants' },
    { name: 'users', content: 'Users' },
    { name: 'simulations', content: 'Simulations' },
    { name: 'ingredients', content: 'Ingredients' },
  ]
  constructor() { }

  ngOnInit() {
  }

  subView(event) {
    this.onSubViewSelection.emit(event);
  }
}
