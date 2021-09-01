import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;

  public selectedEmployee = null;
  public employees: any = [
    {
      role: {
        label: 'role',
        value: 'Cook'
      },
      name: {
        label: 'name',
        value: 'Michel'
      }
    },
    {
      role: {
        label: 'role',
        value: 'Cook'
      },
      name: {
        label: 'name',
        value: 'Roger'
      }
    },
    {
      role: {
        label: 'role',
        value: 'Waiter'
      },
      name: {
        label: 'name',
        value: 'Bob'
      }
    },
    {
      role: {
        label: 'role',
        value: 'Waiter'
      },
      name: {
        label: 'name',
        value: 'Hermann'
      }
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  createEmployee() {
    this.selectedEmployee = {
      role: {
        label: 'role',
        value: ''
      },
      name: {
        label: 'name',
        value: ''
      },
    }
    console.log(this.selectedEmployee);
  }

  SelectEmployee(event){
    this.SelectEmployee = event
  }


}
