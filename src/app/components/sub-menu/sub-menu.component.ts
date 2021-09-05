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
    { name: 'find', content: 'Find a restaurant' },
    { name: 'friends', content: 'Friends' },
    { name: 'eat', content: 'View reservations and eat' }
  ]

  public menuManager: any = [
    { name: 'homePage', content: 'Home page' },
    { name: 'transactions', content: 'Transactions' },
    { name: 'recipies', content: 'Recipies' },
    { name: 'stocks', content: 'Stocks' },
    { name: 'employees', content: 'Employees' }
  ]

  constructor() { }

  ngOnInit() {
  }

  subView(event) {
    this.onSubViewSelection.emit(event);
  }
}
