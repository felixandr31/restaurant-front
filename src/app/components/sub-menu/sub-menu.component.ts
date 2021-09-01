import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  @Input() showView: any;
  @Output() onSubViewSelection = new EventEmitter();

  private menuClient: any = [
        {name: 'find', content: 'Find a restaurant'},
        {name: 'friends', content: 'Friends'},
        {name: 'eat', content: 'View reservations'}
  ]

  constructor() { }

  ngOnInit() {
  }

  subView(event) {
    this.onSubViewSelection.emit(event);
  }

}
