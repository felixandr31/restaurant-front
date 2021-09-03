import { Component, OnInit, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  @Input() showSubView: any;

  // public selectedEmployee = {};
  // public employees: any = [
  //   {
  //     name: 'Tim',
  //     roles: [
  //       { value: 'Client' },
  //       { value: 'Cook' }
  //     ],
  //   },
  //   {
  //     name: 'Roger',
  //     roles: [
  //       { value: 'Cook' },
  //       { value: 'Waiter' }
  //     ],
  //   },
  //   {
  //     name: 'Bob',
  //     roles: [
  //       { value: 'Waiter' }
  //     ],
  //   },
  //   {
  //     name: 'Hermann',
  //     roles: [
  //       { value: 'Waiter' }
  //     ],
  //   },
  // ];

  constructor() {
  }

  ngOnInit() {
    this.showSubView = 'DefaultManager'
  }

  // SelectEmployee(event) {
  //   this.selectedEmployee = event;
  //   console.log("list to manager view" + event)
  // }

  // createEmployee() {
  //   this.selectedEmployee =
  //     {
  //       name: '',
  //       roles: [
  //         { value: '' }
  //       ],
  //     };
  //   console.log(this.selectedEmployee);
  // }




}
