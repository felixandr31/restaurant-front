import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-choose-menu',
  templateUrl: './choose-menu.component.html',
  styleUrls: ['./choose-menu.component.css']
})
export class ChooseMenuComponent implements OnInit {

  @Input() restaurant: any;

  public order = [];

  constructor() { }

  ngOnInit() {
  }

  itemAdded(event) {

  }

  itemRemoved(event) {

  }

}
