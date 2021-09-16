import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, EmailValidator } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  @Input() user: any;
  // @Input() managerRestaurant: any;
  // @Output() onRestaurantModifications = new EventEmitter()
  public managerRestaurant: any;

  public defaultFormValues = {
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
    restaurants: [],
    bookings: []
  }

  public isRestaurantEmployees: boolean;
  public selectedEmployee: any;
  public isSelectedEmployee = false;
  private savedEmployee: any;
  public form: FormGroup;

  public cookChecked = false;
  public waiterChecked = false;
  private availableRoles = [
    {
      id: "61309cb8009435126fc70797",
      name: "Cook"
    },
    {
      id: "61309cbf009435126fc70798",
      name: "Manager"
    },
    {
      id: "6130b6b5e25faf67217a59e1",
      name: "Cleaner"
    },
    {
      id: "6130edd210df7d5b224df808",
      name: "Friend"
    },
    {
      id: "613721c67f57fb321327b627",
      name: "Client"
    },
    {
      id: "613721cc7f57fb321327b628",
      name: "Admin"
    },
    {
      id: "613721e07f57fb321327b629",
      name: "Waiter"
    }
  ]

  public modes = {
    "edition": false,
    "deletionConfirmation": false,
    "creation": false,
    "selectedMode": ''
  }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService, private restaurantService: RestaurantService, ) { }

  ngOnInit() {
    // this.availableRoles = this.roleServices...
    this.refreshRestaurant();
    this.resetSelectedEmployee();
    this.createForms();
  }

  // create required fields and fill with selectedEmployee data, checkboxs are not updated here but with updateRolesCheckbox()
  createForms() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      Cook: [false, Validators.required],
      Waiter: [false, Validators.required],
    })
  }

  resetSelectedEmployee() {
    // spread operator allow to clone selectedEmployee in a new object and to avoid direct modification of employees (because of filter use)
    this.selectedEmployee = { ...this.defaultFormValues }
  }

  updateForm() {
    this.form.patchValue(this.selectedEmployee)
    this.updateRolesCheckbox();
  }

  onSubmit(event) {
    if (this.modes.creation) {
      this.createEmployee()
    }
    if (this.modes.edition) {
      this.updateEmployee()
    }
  }

  employeeSelection(event) {
    // spread operator allow to clone selectedEmployee in a new object and to avoid direct modification of employees (because of filter use)
    this.selectedEmployee = { ...this.managerRestaurant.employees.find(employee => employee.id === event) }
    console.log('Selected employee: ', this.selectedEmployee)
    this.updateForm();
    this.isSelectedEmployee = true
    this.modes.edition = true;
    this.modes.creation = false;
  }

  // Update roles with selected employee values, not with form values !
  updateRolesCheckbox() {
    this.cookChecked = false;
    this.waiterChecked = false;
    this.selectedEmployee.roles.forEach(role => {
      switch (role.name) {
        case 'Waiter':
          this.waiterChecked = true;
          break;
        case 'Cook':
          this.cookChecked = true;
          break;
      }
    })
  }

  formToJson() {
    var employee = { ...this.selectedEmployee }
    // remove Cook and Waiter roles (to fill them after with )
    employee.roles = employee.roles.filter(role => {
      if (role.name === 'Cook' || role.name === 'Waiter') {
        return false
      }
      else {
        return true
      }
    })
    console.log('form values: ', this.form.value)

    // update employee fields with form values
    for (const key in this.form.value) {
      // Add roles Cook or Waiter to employee
      switch (key) {
        case 'Waiter':
          if (this.form.value[key]) {
            console.log('role to add: ', key)
            employee.roles.push(this.availableRoles.find(role =>
              role.name === key))
          }
          break;
        case 'Cook':
          if (this.form.value[key]) {
            console.log('role to add: ', key)
            employee.roles.push(this.availableRoles.find(role =>
              role.name === key))
          }
          break;
      }
      // Update last fields
      for (const k in employee) {
        if (key === k) {
          employee[k] = this.form.value[k]
        }
      }
    }
    console.log('employee: ', employee)
    employee.restaurantId = this.managerRestaurant.id
    return employee;
  }

  createEmployee() {
    // Write in DBB
    this.userService.postUser(this.formToJson()).subscribe(
      data => {
        const newEmployee: any = data.body
        // Update Restaurant employee list
        this.restaurantService.addUsersToRestaurant(this.managerRestaurant.id, [newEmployee.id]).subscribe(
          data => {
            this.refreshRestaurant()
          }
        )
      }
    )
    this.cancelEdition();
    // alert('Employee created!')
  }

  updateEmployee() {
    const employee = this.formToJson();
    const rolesIdsToRemove = ["61309cb8009435126fc70797", "613721e07f57fb321327b629"]
    console.log('employee Json:', employee)

    // Build array of roles Cook or Waiter to add because request need an array of role ids
    var roleIds = Object.assign([], employee.roles.filter(role => {
      switch (role.name) {
        case 'Waiter':
          return true;
        case 'Cook':
          return true;
        default:
          return false
      }
    }).map(role => {
      return role.id
    }))
    console.log('roleIds: ', roleIds)

    // Update user in DB
    this.userService.updateUser(employee.id, employee).subscribe(
      data => {
        console.log('Update: ', data.body)
        // Update user roles in DB: remove then add
        this.userService.removeRoles(employee.id, rolesIdsToRemove).subscribe(
          data => {
            console.log('removeRoles: ', data.body)
            // Add roles only if needed
            if (roleIds.length > 0) {
              this.userService.addRoles(employee.id, roleIds).subscribe(
                data => {
                  console.log('addRoles: ', data.body)
                  this.refreshRestaurant();
                }
              )
            } else {
              this.refreshRestaurant();
            }
          }
        )
      }
    )
    this.cancelEdition();
  }

  employeeDeletionMode() {
    this.modes.deletionConfirmation = true
  }

  onDeletionConfirmation(event) {
    const employee: any = { ...this.selectedEmployee }
    const confirmDeletion = event.target.value
    if (confirmDeletion === "confirmDeletion") {
      console.log([employee.id])
      console.log(this.managerRestaurant.id)
      this.restaurantService.removeUsersFromRestaurant(this.managerRestaurant.id, [employee.id]).subscribe(

      )
      // this.userService.deleteUser(employee.id).subscribe(
      //   data => {
      //     this.refreshRestaurant()
      //   }
      // )
    }
    this.modes.deletionConfirmation = false
    this.cancelEdition();
  }

  cancelEdition() {
    this.resetSelectedEmployee();
    this.updateForm();
    this.resetModes();
  }

  resetModes() {
    for (const mode in this.modes) {
      this.modes[mode] = false
    }
  }

  ToggleEdit() {
    this.isSelectedEmployee = false;
    this.modes.selectedMode = 'EDITION'
    this.modes.edition = !this.modes.edition
    this.modes.creation = false
  }
  ToggleCreate() {
    this.modes.selectedMode = 'CREATION'
    this.modes.creation = !this.modes.creation
    this.modes.edition = false
    this.resetSelectedEmployee();
    this.isSelectedEmployee = true
    this.updateForm();
  }

  refreshRestaurant() {
    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {
        this.managerRestaurant = data.body
        console.log(this.managerRestaurant)
        console.log(this.isRestaurantEmployees)
        this.displayList();
      }
    )
  }

  displayList() {
    if (this.managerRestaurant.employees.length > 0 || this.managerRestaurant.employees[0] !== null) {
      this.isRestaurantEmployees = true
    } else {
      this.isRestaurantEmployees = false
    }
  }

}
