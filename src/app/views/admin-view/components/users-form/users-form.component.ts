import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  @Input() loggedUser: any;
  @Input() availableRoles: any;
  @Input() currentView: any;

  public userForm: FormGroup;
  public allUsers: any;
  public usersExist = false;
  public selectedUser: any;
  public isSelectedUser = false;
  public loggedUserIsAdmin = false;

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


  constructor(private formBuilder: FormBuilder, private userService: UserService, private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.refreshAllUsers()
    this.resetSelectedUser()
    this.createForms()
  }

  refreshAllUsers() {
    this.userService.getUsers().subscribe(
      data => {
        // Remove logged User from Users list to avoid self modifications
        this.allUsers = Object.assign([], data.body).filter((user) => user.id !== this.loggedUser.id)
        this.enableEdition();
      }
    )
  }

  resetSelectedUser() {
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

  enableEdition() {
    if (this.allUsers.length > 0) {
      this.usersExist = true
    } else {
      this.usersExist = false
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

  updateForm() {
    this.updateRolesCheckbox();
    this.userForm.patchValue(this.selectedUser)
    this.userForm.patchValue(this.userRolesChecked)
  }

  // Update user roles with current values (selected employee, not with form values !)
  updateRolesCheckbox() {
    this.resetRolesCheckboxs()
    // update userRoleChecked with selectedUser roles
    this.selectedUser.roles.forEach(role => {
      this.userRolesChecked[role.name] = true
    })
  }

  resetRolesCheckboxs() {
    for (const role in this.userRolesChecked) {
      this.userRolesChecked[role] = false
    }
  }

  onSubmit(event) {
    if (this.modes.creation) {
      this.createUser()
    }
    if (this.modes.edition) {
      this.updateUser()
    }
  }

  createUser() {
    var user = { ...this.formToJson() };
    this.userService.postUser(user).subscribe(
      data => {
        this.refreshAllUsers()
      }
    )
    this.cancelEdition();
  }

  userSelection(event) {
    // Better pick user by id than from users because some missing data in users prevent user updating
    this.userService.getUserById(event.target.value).subscribe(
      data => {
        this.selectedUser = data.body
        this.updateForm();
      }
    )
    this.isSelectedUser = true
  }

  formToJson() {
    // get user template
    var user = { ...this.selectedUser }
    // remove roles (to fill them after with form values)
    user.roles = []
    user.roles.push(this.availableRoles.find(role => role.name === "Client"))
    // update employee fields with form values
    for (const key in this.userForm.value) {

      // If key = availablerole check if it is checked
      if (this.availableRoles.find(role => role.name === key)) {
        // If role checked pushed in roles
        if (this.userForm.value[key]) {
          user.roles.push(this.availableRoles.find(role => role.name === key))
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

  updateUser() {
    // Here user has an id because it was previously selected from DB. restaurant assignment work with
    var userToUpdate = { ...this.formToJson() };
    this.userService.updateUser(userToUpdate.id, userToUpdate).subscribe(
      data => {
        this.updateUserRoles(userToUpdate)
      }
    )
    this.cancelEdition();
  }

  updateUserRoles(user) {
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

    // Update user roles in DB: remove then add
    this.userService.removeRoles(user.id, rolesIdsToRemove).subscribe(
      data => {
        // Add roles only if needed
        if (rolesIds.length > 0) {
          this.userService.addRoles(user.id, rolesIds).subscribe(
            data => {
              this.refreshAllUsers();
            }
          )
        }
        this.refreshAllUsers();
      }
    )
  }

  userDeletionMode() {
    this.modes.deletionConfirmation = true
  }

  onDeletionConfirmation(event) {
    const user: any = { ...this.selectedUser }
    const options = {
      body:
        [user.id]
      ,
    };
    if (event.target.value === "confirmDeletion") {
      // replace null value to allow deletion
      if (user.restaurantId === null) {
        user.restaurantId = ""
      }
      // remove user from restaurant before removing user if he has restaurantId
      if (user.restaurantId.length > 0) { // User is employee
        this.restaurantService.removeUsersFromRestaurant(user.restaurantId, options).subscribe(
        )
      }
      // Delete user
      this.userService.deleteUser(user.id).subscribe(
        data => {
          this.refreshAllUsers()
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
}
