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

  @Input() user: any;

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
  };
  public isRestaurantEmployees: boolean;
  public selectedEmployee: any;
  public isSelectedEmployee = false;
  public form: FormGroup;
  public cookChecked = false;
  public waiterChecked = false;
  private availableRoles: any;
  public modes = {
    "edition": false,
    "deletionConfirmation": false,
    "creation": false,
    "selectedMode": ''
  };

  constructor(private formBuilder: FormBuilder,
    private userService: UserService, private restaurantService: RestaurantService, private roleService: RoleService ) { }

  ngOnInit() {
    this.refreshRestaurant()
    this.resetSelectedEmployee()
    this.createForms()
    this.refreshRoles()
  }

  refreshRestaurant() {
    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {
        this.managerRestaurant = data.body
        this.displayList();
      }
    )
  }

  refreshRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.availableRoles = data.body
      }
    )
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
    this.updateForm();
    this.isSelectedEmployee = true
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

    // update employee fields with form values
    for (const key in this.form.value) {
      // Add roles Cook or Waiter to employee
      switch (key) {
        case 'Waiter':
          if (this.form.value[key]) {
            employee.roles.push(this.availableRoles.find(role =>
              role.name === key))
          }
          break;
        case 'Cook':
          if (this.form.value[key]) {
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
    // const rolesIdsToRemove = ["61309cb8009435126fc70797", "613721e07f57fb321327b629"]
    var rolesIdsToRemove = Object.assign([], this.availableRoles.filter(role => {
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

    // Update user in DB
    this.userService.updateUser(employee.id, employee).subscribe(
      data => {
        // Update user roles in DB: remove then add
        this.userService.removeRoles(employee.id, rolesIdsToRemove).subscribe(
          data => {
            // Add roles only if needed
            if (roleIds.length > 0) {
              this.userService.addRoles(employee.id, roleIds).subscribe(
                data => {
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
    const options = {
      body:
        [employee.id]
      ,
    };
    if (confirmDeletion === "confirmDeletion") {
      this.restaurantService.removeUsersFromRestaurant(this.managerRestaurant.id, options).subscribe(
        data => {
          this.userService.deleteUser(employee.id).subscribe(
            data => {
              this.refreshRestaurant()
            }
          )
        }
      )
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
    this.isSelectedEmployee = false
    this.modes.selectedMode = 'EDITION'
    this.modes.edition = !this.modes.edition
    this.modes.creation = false
  }
  ToggleCreate() {
    this.isSelectedEmployee = true
    this.modes.selectedMode = 'CREATION'
    this.modes.creation = !this.modes.creation
    this.modes.edition = false
    this.resetSelectedEmployee();
    this.updateForm();
  }


  displayList() {
    if (this.managerRestaurant.employees.length > 0) {
      this.isRestaurantEmployees = true
    } else {
      this.isRestaurantEmployees = false
    }
  }

}
