import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.css']
})
export class SideNavigationMenuComponent implements OnInit {

  constructor() { }

  @Input() clientRoles: any;
  @Input() showView: any;
  @Output() clickedTab :EventEmitter<String> = new EventEmitter()
  @Output() onSubViewSelection = new EventEmitter();

  ngOnInit() {
  }

  logout(){
    console.log("Nothing yet, logout")
  }

  changeView(event) {
    return this.clickedTab.emit(event)
  }

  showSubView(event) {
    this.onSubViewSelection.emit(event);
  }

}
