import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;

  public employees: any = [
    {
      role: {
        label: 'role',
        name: 'Cook'
      },
      name: {
        label: 'name',
        name: 'Michel'
      }
    },
    {
      role: {
        label: 'role',
        name: 'Cook'
      },
      name: {
        label: 'name',
        name: 'Roger'
      }
    },
    {
      role: {
        label: 'role',
        name: 'Waiter'
      },
      name: {
        label: 'name',
        name: 'Bob'
      }
    },
    {
      role: {
        label: 'role',
        name: 'Waiter'
      },
      name: {
        label: 'name',
        name: 'Hermann'
      }
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
