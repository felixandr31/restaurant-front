import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, EmailValidator } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';
import { RoleService } from 'src/app/services/data/role.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  @Input() restaurant: any;

  constructor() { }

  ngOnInit() {

  }

  fireEmployee(event) {

  }

  switchToEditUser() {
    // output modify showsubview + toggle Edit mod + selected user = user
  }

  toggleAddEmployee(){
    // display list of users with role != client and restaurantId!= selected restaurant
    // or list of
    // button addEmployee
    // button Create employee = switch to create user
  }

  addEmployee() {

  }

}
