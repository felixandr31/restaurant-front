import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, EmailValidator } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';


@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit, OnChanges {


  @Input() restaurant: any;
  @Input() availableUsers: any;
  @Output() onRestaurantUpdate = new EventEmitter();
  @Output() onUserUpdate = new EventEmitter();

  public displayAvailableEmployeeList = false
  public searchEmployeeForm: FormGroup;
  public availableEmployees = [];
  public restaurantEmployees = []
  public restaurantHasEmployees = false
  public addableEmployees = []

  constructor(private userService: UserService, private restaurantService: RestaurantService) { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['availableUsers'] != undefined && changes['availableUsers'].isFirstChange()) {
      this.getAvailableEmployees()
    }
    this.getRestaurantEmployees()
    this.getAddableEmployees()
  }

  // Get all users with more than just CLient role
  getAvailableEmployees() {
    this.availableUsers.forEach(user => {
      user.manager = false
      if (user.roles.find((role) => role.name !== 'Client')) {
        this.availableEmployees.push(user)
      }
      if (user.roles.find((role) => role.name === 'Manager')) {
        user.manager = true
      }
    })
  }

  getRestaurantEmployees() {
    if (this.restaurant.employees.length > 0) {
      this.restaurantHasEmployees = true
      this.restaurantEmployees = [...this.restaurant.employees]
      this.restaurantEmployees.forEach(employee => {
        employee.manager = false
        if (employee.roles.find((role) => role.name === 'Manager')) {
          employee.manager = true
        }
      });
    }
    else {
      this.restaurantHasEmployees = false
    }
  }

  getAddableEmployees() {
    this.addableEmployees = []
    this.availableEmployees.forEach(employee => {
      var addable = true
      this.restaurantEmployees.forEach(restEmployee => {
        if (employee.id === restEmployee.id) {
          addable = false
        }
      })
      if (addable) {
        this.addableEmployees.push(employee)
      }
    })
  }

  toggleAddEmployee() {
    this.displayAvailableEmployeeList = !this.displayAvailableEmployeeList
  }

  addEmployee(event) {
    this.userService.getUserById(event.target.value).subscribe(
      data => {
        let user: any = data.body
        user.restaurantId = this.restaurant.id
        this.userService.updateUser(user.id, user).subscribe(
          data => {
            this.onUserUpdate.emit()
            let newEmployee: any = data.body
            this.restaurantService.addUsersToRestaurant(this.restaurant.id, [newEmployee.id]).subscribe(
              data => {
                this.onRestaurantUpdate.emit()
                // this.getAddableEmployees()
              })
          }
        )
      }
    )
  }

  fireEmployee(event) {
    this.userService.getUserById(event.target.value).subscribe(
      data => {
        let user: any = data.body
        user.restaurantId = ""
        this.userService.updateUser(user.id, user).subscribe(
          data => {
            this.onUserUpdate.emit()
            let oldEmployee: any = data.body
            const options = {
              body:
                [oldEmployee.id],
            };
            this.restaurantService.removeUsersFromRestaurant(this.restaurant.id, options).subscribe(
              data => {
                this.onRestaurantUpdate.emit()
                // this.getAddableEmployees()
              }
            )
          }
        )
      }
    )
  }

  searchEmployee() {

  }

  switchToEditUser() {
    // output modify showsubview + toggle Edit mod + selected user = user
  }

  switchToCreateUser() {

  }
}
