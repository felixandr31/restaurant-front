import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import { RoleService } from 'src/app/services/data/role.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  @Input() loggedUser: any;
  @Input() availableRoles: any;
  @Input() allRestaurants: any;
  @Input() notManagedRestaurant: any;
  @Output() onRestaurantUpdate = new EventEmitter();

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
      // {
      //   "id": this.availableRoles.id['Client'],
      //   "name": "Client"
      // },
    ],
    friends: [],
    bookings: []
  };
  public clientRole: any
  public allUsers: any;
  public selectedRole: any;
  public userForm: FormGroup;
  public isUsers: boolean;
  public selectedUser: any;
  public isSelectedUser = false;
  // TODO: use availableRoles to build this
  public userRolesChecked = {
    "Cook": false,
    "Waiter": false,
    "Admin": false,
    "Manager": false,
    "Cleaner": false,
  }
  public modes = {
    "edition": false,
    "deletionConfirmation": false,
    "creation": false,
    "selectedMode": '',
  }
  public userIsEmployee = {
    "was": false,
    "is": false,
  }
  public userIsManager = {
    "was": false,
    "is": false,
  }
  public isRestaurantAssignment = false
  public availableRestaurants: any
  public selectedRestaurantId: any

  constructor(private formBuilder: FormBuilder, private userService: UserService, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.refreshUsers()
    this.resetSelectedUser()
    this.createForms()
  }

  // TODO: assign filteredUser to allUsers (when list of allusers displayed allusers not affected yet...)
  refreshUsers() {
    this.userService.getUsers().subscribe(
      data => {
        // this.allUsers = data.body
        this.allUsers = Object.assign([], data.body).filter((user) => user.id !== this.loggedUser.id)
        this.enableEdition();
      }
    )
  }

  resetSelectedUser() {
    // spread operator allow to clone selectedEmployee in a new object and to avoid direct modification of employees (because of filter use)
    this.selectedUser = { ...this.defaultUserFormValues }
  }

  createForms() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      Admin: [this.userRolesChecked.Admin, Validators.required],
      Manager: [this.userRolesChecked.Manager, Validators.required],
      Cook: [this.userRolesChecked.Cook, Validators.required],
      Waiter: [this.userRolesChecked.Waiter, Validators.required],
      Cleaner: [this.userRolesChecked.Cleaner, Validators.required],
    })
  }

  updateForm() {
    this.updateRolesCheckbox();
    this.userForm.patchValue(this.selectedUser)
    this.userForm.patchValue(this.userRolesChecked)
  }

  onSubmit(event) {
    if (this.modes.creation) {
      this.createUser()
    }
    if (this.modes.edition) {
      this.updateUser()
    }
  }

  userSelection(event) {
    this.resetUserIsEmployee()
    // spread operator allow to clone selectedEmployee in a new object and to avoid direct modification of employees (because of filter use)
    // Better pick user by id than from users because data are missing in users to update user after
    this.userService.getUserById(event.target.value).subscribe(
      data => {
        this.selectedUser = { ...data.body }
        this.updateForm();
      }
    )
    this.isSelectedUser = true
  }

  // Update user roles with current values (selected employee, not with form values !)
  updateRolesCheckbox() {
    this.resetRolesCheckboxs()
    // update userRoleChecked with selectedUser roles
    this.selectedUser.roles.forEach(role => {
      this.userRolesChecked[role.name] = true
      // if true user was an employee
      if (role.name !== 'Client') {
        this.userIsEmployee.was = true
      }
      if (role.name !== 'Manager') {
        this.userIsManager.was = true
      }
    })
  }

  resetRolesCheckboxs() {
    for (const role in this.userRolesChecked) {
      this.userRolesChecked[role] = false
    }
  }

  createUser() {
    this.resetUserIsEmployee()
    var user = { ...this.formToJson() };
    // Write in DBB
    this.userService.postUser(user).subscribe()
    this.refreshUsers()
    this.restaurantAssignment(user)
    this.cancelEdition();
    // alert('Employee created!')
  }

  updateUser() {
    var user = { ...this.formToJson() };
    let rolesIdsToRemove: string[];
    let rolesIds: string[];

    // Build array of roleIds for delete request
    rolesIdsToRemove = this.availableRoles.map(role => {
      return role.id;
    })
    // Build array of roles ids to add because request need an array of role ids
    rolesIds = [...user.roles.map(role => {
      return role.id;
    })]

    // Update user in DB
    this.userService.updateUser(user.id, user).subscribe(
      data => {
        // Update user roles in DB: remove then add
        this.userService.removeRoles(user.id, rolesIdsToRemove).subscribe(
          data => {
            // Add roles only if needed
            if (rolesIds.length > 0) {
              this.userService.addRoles(user.id, rolesIds).subscribe(
                data => {
                  this.refreshUsers();
                }
              )
            } else {
              this.refreshUsers();
            }
          }
        )
      }
    )
    this.restaurantAssignment(user)
    this.cancelEdition();
  }

  formToJson() {
    // get user template
    var user = { ...this.selectedUser }
    // remove roles (to fill them after with form values )
    user.roles = []
    user.roles.push(this.availableRoles.find(role => role.name === "Client"))
    // update employee fields with form values
    for (const key in this.userForm.value) {
      // Add roles to user
      // Take only key = availableRoles from userForm
      if (this.availableRoles.find(role => role.name === key)) {
        // If role checked pushed in roles
        if (this.userForm.value[key]) {
          user.roles.push(this.availableRoles.find(role => role.name === key))
          // if true user is an employee
          if (key !== 'Client') {
            this.userIsEmployee.is = true
          }
          if (key === 'Manager') {
            this.userIsManager.is = true
          }
        }
      }
      // Update last fields
      for (const k in user) {
        if (k === key) {
          user[k] = this.userForm.value[k]
        }
      }
    }
    return user;
  }

  userDeletionMode() {
    this.modes.deletionConfirmation = true
  }

  onDeletionConfirmation(event) {
    const user: any = { ...this.selectedUser }
    const confirmDeletion = event.target.value
    const options = {
      body:
        [user.id]
      ,
    };
    if (confirmDeletion === "confirmDeletion") {
      // replace null value to allow deletion
      if (user.restaurantId === null) {
        user.restaurantId = ""
      }
      // remove user from restaurant before remooving user if he has restaurantId
      if (user.restaurantId.length > 0) { // User is employee
        this.restaurantService.removeUsersFromRestaurant(user.restaurantId, options).subscribe()
      }
      // Delete user
      this.userService.deleteUser(user.id).subscribe(
        data => {
          this.refreshUsers()
        }
      )
    }
    this.modes.deletionConfirmation = false
    this.cancelEdition();
  }

  cancelEdition() {
    this.resetSelectedUser();
    this.updateForm();
    this.resetModes();
  }

  resetModes() {
    for (const mode in this.modes) {
      this.modes[mode] = false
    }
  }

  ToggleEdit() {
    this.isSelectedUser = false
    this.modes.selectedMode = 'EDITION'
    this.modes.edition = !this.modes.edition
    this.modes.creation = false
  }
  ToggleCreate() {
    this.isSelectedUser = true
    this.modes.selectedMode = 'CREATION'
    this.modes.creation = !this.modes.creation
    this.modes.edition = false
    this.resetSelectedUser();
    this.updateForm();
  }

  enableEdition() {
    if (this.allUsers.length > 0) {
      this.isUsers = true
    } else {
      this.isUsers = false
    }
  }

  restaurantAssignment(user) {
    // new employee = add restaurant
    if (!this.userIsEmployee.was && this.userIsEmployee.is) {
      console.log('new employee')
      if (this.userIsManager.is) {
        console.log('new manager')
        this.toggleChooseRestaurant(this.notManagedRestaurant)
      } else {
        this.toggleChooseRestaurant(this.allRestaurants)
      }

      console.log(this.selectedRestaurantId)
      //   // add user to restaurant.employees
      //   this.restaurantService.addUsersToRestaurant(this.selectedRestaurantId, [user.id]).subscribe(
      //     data => {
      //       this.onRestaurantUpdate.emit()
      //     }
      //   )
      //   // Maj user.restoId :
      //   this.userService.updateUser(user.id, user).subscribe()
    }

    // Employee updated
    if (this.userIsEmployee.was) {
      // remove employee but still Client = remove restaurant
      if (!this.userIsEmployee.is) {
        console.log('remove employee')
        console.log(user.restaurantId)
        // const options = {
        //   body:
        //     [user.id]
        //   ,
        // };
        // this.restaurantService.removeUsersFromRestaurant(user.restaurantId, options).subscribe(
        //   data => {
        //   }
        // )

        // Maj user.restoId :
        // user.restaurantId = ""
        // this.userService.updateUser(user.id, user).subscribe()

      }
    }

  }

  resetUserIsEmployee() {
    for (var item in this.userIsEmployee) {
      this.userIsEmployee[item] = false
    }
    this.userIsManager.is = false
  }

  toggleChooseRestaurant(restaurantList) {
    this.isRestaurantAssignment = true
    this.availableRestaurants = restaurantList
  }

  onRestaurantSelection(event) {
    this.selectedRestaurantId = event.target.value
    this.isRestaurantAssignment = false
  }

}
