import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() availableRoles: any;

  public defaultUserFormValues = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    restaurantId: '',
    roles: [
      {
        "id": "613721c67f57fb321327b627",
        "name": "Client"
      },
    ],
    friends: [],
    bookings: []
  };

  public selectedRole: any;

  constructor() { }

  ngOnInit() {

  }

  roleSelection(event){
    console.log(event)
    this.selectedRole = {...this.availableRoles.find(role => role.id === event)}

    // this.selectedEmployee = { ...this.managerRestaurant.employees.find(employee => employee.id === event) }
  }

}
