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
  @Input() availableRoles: any;

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
    bookings: []
  };
  public isRestaurantEmployees: boolean;
  public selectedEmployee: any;
  public isSelectedEmployee = false;
  public form: FormGroup;
<<<<<<< HEAD
  public cookChecked = false;
  public waiterChecked = false;
  public isChargingReastaurant: boolean = true;
  private availableRoles: any;
=======

  public userRolesChecked = {
    "Cook": false,
    "Waiter": false,
    "Admin": false,
    "Manager": false,
    "Cleaner": false,
  }

>>>>>>> 442012a5f4d42df2cf988c28d2d90131cfa3c530
  public modes = {
    "edition": false,
    "deletionConfirmation": false,
    "creation": false,
    "selectedMode": ''
  };

  constructor(private formBuilder: FormBuilder,
    private userService: UserService, private restaurantService: RestaurantService, private roleService: RoleService) { }

  ngOnInit() {
    this.refreshRestaurant()
    this.resetSelectedEmployee()
    this.createForms()
  }

  refreshRestaurant() {
    this.restaurantService.getRestaurantById(this.user.restaurantId).subscribe(
      data => {
        this.managerRestaurant = data.body
<<<<<<< HEAD
        this.isChargingReastaurant = false;
        this.displayList();
      }
    )
  }

  refreshRoles() {
    this.roleService.getRoles().subscribe(
      data => {
        this.availableRoles = data.body
=======
        this.enableEdition();
>>>>>>> 442012a5f4d42df2cf988c28d2d90131cfa3c530
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
      Cook: [this.userRolesChecked.Cook, Validators.required],
      Waiter: [this.userRolesChecked.Waiter, Validators.required],
    })
  }

  resetSelectedEmployee() {
    // spread operator allow to clone selectedEmployee in a new object and to avoid direct modification of employees (because of filter use)
    this.selectedEmployee = { ...this.defaultFormValues }
  }

  updateForm() {
    this.updateRolesCheckbox();
    this.form.patchValue(this.selectedEmployee)
    this.form.patchValue(this.userRolesChecked)
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
    // this.cookChecked = false;
    // this.waiterChecked = false;
    // this.selectedEmployee.roles.forEach(role => {
    //   switch (role.name) {
    //     case 'Waiter':
    //       this.waiterChecked = true;
    //       break;
    //     case 'Cook':
    //       this.cookChecked = true;
    //       break;
    // }
    // })
    this.resetRolesCheckboxs()
    this.selectedEmployee.roles.forEach(role => {
      this.userRolesChecked[role.name] = true
      // TODO: if manager||cook||waiter this.userIsEmployee.was = true
    })
  }

  resetRolesCheckboxs() {
    for (const role in this.userRolesChecked) {
      this.userRolesChecked[role] = false
    }
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

      // // Add roles Cook or Waiter to employee

      // switch (key) {
      //   case 'Waiter':
      //     if (this.form.value[key]) {
      //       employee.roles.push(this.availableRoles.find(role =>
      //         role.name === key))
      //     }
      //     break;
      //   case 'Cook':
      //     if (this.form.value[key]) {
      //       employee.roles.push(this.availableRoles.find(role =>
      //         role.name === key))
      //     }
      //     break;
      // }


      // Add roles to user
      // Take only roles from userForm keys, check if role is available
      if (this.availableRoles.find(role => role.name === key)) {
        // If role checked pushed in roles
        if (this.form.value[key]) {
          employee.roles.push(this.availableRoles.find(role => role.name === key))
          // TODO: this.userIsEmployee.is = true
        }
      }
      // Update last fields
      for (const k in employee) {
        if (key === k) {
          employee[k] = this.form.value[k]
        }
      }
    }
    // TODO: replace with restaurantAssignemnt() (in )
    employee.restaurantId = this.managerRestaurant.id

    return employee;
  }

  createEmployee() {
    // TODO: reset userIsEmployee
    // Write in DBB
    this.userService.postUser(this.formToJson()).subscribe(
      data => {
        // const newEmployee: any = data.body
        // // Update Restaurant employee list
        // this.restaurantService.addUsersToRestaurant(this.managerRestaurant.id, [newEmployee.id]).subscribe(
        //   data => {
        //     this.refreshRestaurant()
        //   }
        // )
      }
    )
    // TODO: restaurantAssignment()
    this.cancelEdition();
    // alert('Employee created!')
  }

  updateEmployee() {
    var employee = this.formToJson();

    let rolesIdsToRemove: string[];
    let rolesIds: string[];

    // Build array of roleIds for delete request
    rolesIdsToRemove = this.availableRoles.map(role => {
      return role.id;
    })

    // Build array of roles ids to add because request need an array of role ids
    rolesIds = [...employee.roles.map(role => {
      return role.id;
    })]

    // var rolesIdsToRemove = Object.assign([], this.availableRoles.filter(role => {
    //   switch (role.name) {
    //     case 'Waiter':
    //       return true;
    //     case 'Cook':
    //       return true;
    //     default:
    //       return false
    //   }
    // }).map(role => {
    //     return role.id
    //   }))

    // // Build array of roles Cook or Waiter to add because request need an array of role ids
    // var roleIds = Object.assign([], employee.roles.filter(role => {
    //   switch (role.name) {
    //     case 'Waiter':
    //       return true;
    //     case 'Cook':
    //       return true;
    //     default:
    //       return false
    //   }
    // }).map(role => {
    //   return role.id
    // }))


    // Update user in DB
    this.userService.updateUser(employee.id, employee).subscribe(
      data => {
        // Update user roles in DB: remove then add
        this.userService.removeRoles(employee.id, rolesIdsToRemove).subscribe(
          data => {
            // Add roles only if needed
            if (rolesIds.length > 0) {
              this.userService.addRoles(employee.id, rolesIds).subscribe(
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
    // TODO: restaurantAssignment() (if )
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

  // onDeletionConfirmation(event) {
  //   const employee: any = { ...this.selectedEmployee }
  //   const confirmDeletion = event.target.value
  //   // const options = {
  //   //   body:
  //   //     [employee.id]
  //   //   ,
  //   // };
  //   if (confirmDeletion === "confirmDeletion") {
  //     // this.restaurantService.removeUsersFromRestaurant(this.managerRestaurant.id, options).subscribe(
  //     //   data => {
  //     //   }
  //     // )

  //     // TODO: restaurantAssignment() => employeeIsEmployee (was + isnot)
  //     // this.userService.deleteUser(employee.id).subscribe(
  //     //   data => {
  //     //     this.refreshRestaurant()
  //     //   }
  //     // )
  //   }
  //   this.modes.deletionConfirmation = false
  //   this.cancelEdition();
  // }

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

  enableEdition() {
    if (this.managerRestaurant.employees.length > 0) {
      this.isRestaurantEmployees = true
    } else {
      this.isRestaurantEmployees = false
    }
  }

  // TODO: restaurantAssignment(){
  //   if (wasnot + is) => trigger addUsersToRestaurant (bool isRestaurantAssingment)
  //   if (was + isnot) => trigger removeUserFromRestaurant (bool isRestaurantAssigment)
  // }

  // TODO: reset userIsEmployee(){ false }

}
