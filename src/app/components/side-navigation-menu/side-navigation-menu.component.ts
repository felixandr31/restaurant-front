import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.css']
})
export class SideNavigationMenuComponent implements OnInit, OnChanges {

  constructor() { }


  @Input() showView: any;
  @Input() user: any;
  @Output() clickedTab: EventEmitter<String> = new EventEmitter()
  @Output() onSubViewSelection = new EventEmitter();
  @Output() onLogOut = new EventEmitter();

  public clientRoles = [
    { name: 'Admin' },
    { name: 'Manager' },
    { name: 'Cook' },
    { name: 'Waiter' },
    { name: 'Client' },
  ];

  ngOnInit() {
  }

  ngOnChanges() {
    this.clientRoles = this.user.roles;
  }

  logout() {
    this.onLogOut.emit(event)
  }

  changeView(event) {
    return this.clickedTab.emit(event)
  }

  showSubView(event) {
    this.onSubViewSelection.emit(event);
  }
}
