import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;

  public employees: any = [
    {
      role: 'Cook',
      name: 'Michel'
    },
    {
      role: 'Cook',
      name: 'Roger'
    },
    {
      role: 'Waiter',
      name: 'Bob'
    },
    {
      role: 'Waiter',
      name: 'Hermann'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
