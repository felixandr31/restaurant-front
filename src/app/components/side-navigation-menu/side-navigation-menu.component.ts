import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.css']
})
export class SideNavigationMenuComponent implements OnInit {

  constructor() { }

  @Input() clientRoles: any;
  @Output() clickedTab :EventEmitter<String> = new EventEmitter()

  ngOnInit() {
  }

  // writeInConsole(output){
  //   console.log("Clicked :" + output)
  // }

  logout(){
    console.log("Nothing yet, logout")
  }

}
