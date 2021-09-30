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
export class EmployeesFormComponent implements OnInit, OnChanges {


  @Input() restaurant: any;

  public displayAvailableEmployeeList = false
  public searchEmployeeForm: FormGroup;
  public availableEmployees: any;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.restaurant.employees.length > 0) {
      console.log('restaurant has employees')

      this.restaurant.employees.forEach(employee => {
        if(employee.roles.includes(role => role.name === 'Manager')) {
          console.log('employee is manager')
        }
        else {
          console.log('employee is NOT manager')
        }
      });
    }
    else {
      console.log('restaurant has NOT employees')
    }
  }

  fireEmployee(event) {

  }

  switchToEditUser() {
    // output modify showsubview + toggle Edit mod + selected user = user
  }

  switchToCreateUser() {

  }

  toggleAddEmployee(){
    this.displayAvailableEmployeeList = true
    // display list of users with role != client and restaurantId!= selected restaurant
    // or list of
    // button addEmployee
    // button Create employee = switch to create user
  }

  addEmployee() {

  }

  refreshUsers() {

  }

  searchEmployee() {

  }

}
