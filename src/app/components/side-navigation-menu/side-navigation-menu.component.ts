import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.css']
})
export class SideNavigationMenuComponent implements OnInit {

  constructor() { }

  @Input() tabNames:String[]
  @Output() clickedTab :EventEmitter<number> = new EventEmitter()

  ngOnInit() {
  }

}
