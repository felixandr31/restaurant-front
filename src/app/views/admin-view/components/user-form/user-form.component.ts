import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';

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
  public users: any;
  public selectedRole: any;
  public userForm: FormGroup;
  public isUsers: boolean;
  public selectedUser: any;
  public isSelectedUser = false;
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
    "selectedMode": ''
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }


  ngOnInit() {
    this.refreshUsers()
    this.resetSelectedUser()
    this.createForms()
  }

  refreshUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data.body
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
      Admin: [false, Validators.required],
      Manager: [false, Validators.required],
      Cook: [false, Validators.required],
      Waiter: [false, Validators.required],
      Cleaner: [false, Validators.required],
    })
  }

  updateForm() {
    this.userForm.patchValue(this.selectedUser)
    this.updateRolesCheckbox();
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
    // spread operator allow to clone selectedEmployee in a new object and to avoid direct modification of employees (because of filter use)
    this.selectedUser = { ...this.users.find(user => user.id === event.target.value) }
    this.updateForm();
    this.isSelectedUser = true
  }

  // Update roles with selected employee values, not with form values !
  updateRolesCheckbox() {
    this.resetRolesCheckboxs()
    this.selectedUser.roles.forEach(role => {
      this.userRolesChecked[role.name] = true
    })
  }

  resetRolesCheckboxs() {
    for (const role in this.userRolesChecked) {
      this.userRolesChecked[role] = false
    }
  }

  formToJson() {
    // get user template
    var user = { ...this.selectedUser }
    console.log(this.selectedUser)
    // remove roles (to fill them after with form values )
    user.roles = []
    user.roles.push(this.availableRoles.find(role => role.name === "Client"))
    // update employee fields with form values
    for (const key in this.userForm.value) {
      // Add roles to user
      // Take only roles from form keys
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

  createUser() {
    // // Write in DBB
    // this.userService.postUser(this.formToJson()).subscribe(
    //   data => {
    //     const newEmployee: any = data.body
    //     // Update Restaurant employee list
    //     this.restaurantService.addUsersToRestaurant(this.managerRestaurant.id, [newEmployee.id]).subscribe(
    //       data => {
    //         this.refreshRestaurant()
    //       }
    //     )
    //   }
    // )
    // this.cancelEdition();
    // // alert('Employee created!')
  }

  updateUser() {
    const user = this.formToJson();

    // // const rolesIdsToRemove = ["61309cb8009435126fc70797", "613721e07f57fb321327b629"]
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

    // // Update user in DB
    // this.userService.updateUser(employee.id, employee).subscribe(
    //   data => {
    //     // Update user roles in DB: remove then add
    //     this.userService.removeRoles(employee.id, rolesIdsToRemove).subscribe(
    //       data => {
    //         // Add roles only if needed
    //         if (roleIds.length > 0) {
    //           this.userService.addRoles(employee.id, roleIds).subscribe(
    //             data => {
    //               this.refreshRestaurant();
    //             }
    //           )
    //         } else {
    //           this.refreshRestaurant();
    //         }
    //       }
    //     )
    //   }
    // )
    // this.cancelEdition();
  }

  userDeletionMode() {
    this.modes.deletionConfirmation = true
  }

  onDeletionConfirmation(event) {
    // const employee: any = { ...this.selectedUser }
    // const confirmDeletion = event.target.value
    // const options = {
    //   body:
    //     [employee.id]
    //   ,
    // };
    // if (confirmDeletion === "confirmDeletion") {
    //   this.restaurantService.removeUsersFromRestaurant(this.managerRestaurant.id, options).subscribe(
    //     data => {
    //       this.userService.deleteUser(employee.id).subscribe(
    //         data => {
    //           this.refreshRestaurant()
    //         }
    //       )
    //     }
    //   )
    // }
    // this.modes.deletionConfirmation = false
    // this.cancelEdition();
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
    if (this.users.length > 0) {
      this.isUsers = true
    } else {
      this.isUsers = false
    }
  }

}
