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

  @Input() user: any;
  @Input() managerRestaurant: any;
  @Output() onRestaurantModifications = new EventEmitter()

  public employees: any[];

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
    this.resetSelectedEmployee();
    this.createForms();
  }

  ngOnChanges() {
    this.employees = this.managerRestaurant.employees
  }

  // créé tous les champs requis, remplis firstName et lastName avec selectedEmployee mais ne coche pas les checkboxs
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
    this.selectedEmployee = {...this.defaultFormValues}
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
    this.selectedEmployee = this.employees.find(employee => employee.id === event)
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

  createEmployee() {
    // Write in DBB
    this.userService.postUser(this.formToJson()).subscribe(
      data => {
        console.log("data: ", data)
        const newEmployee: any = data.body
        // Update Restaurant employee list
        this.restaurantService.addUserToRestaurant(this.managerRestaurant.id, [newEmployee.id]).subscribe(
          data => {
            console.log(data.body)
          },
          err => {
            console.log('err', err)
          }
        )
      },
      err => {
        console.log('err: ', err)
      }
    )
    this.reloadRestaurant()
    this.cancelEdition();
    alert('Employee created!')
  }

  formToJson() {
    // spread operator allow to copy selectedEmployee and to avoid direct modification of selectedEmployee (because of filter use)
    let employee = { ...this.selectedEmployee }

    // remove Cook and Waiter roles
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
      for (const k in employee) {
        if (key === k) {
          employee[k] = this.form.value[k]
        }
      }

      // Add roles Cook or Waiter to employee
      if (key === 'Cook' || key === 'Waiter') {
        if (this.form.value[key]) {
          employee.roles.push(this.availableRoles.find(role =>
            role.name === key))
        }
        else {
        }
      }
    }
    employee.restaurantId = this.managerRestaurant.id
    return employee;
  }

  updateEmployee() {
    const employee = this.formToJson();
    const rolesIdsToRemove = ["61309cb8009435126fc70797", "613721e07f57fb321327b629"]
    // Build array of roles Cook or Waiter to add
    var roleIds = employee.roles.filter(role => {
      if (role.name === 'Cook' || role.name === 'Waiter') {
        return true
      } else {
        return false
      }
    }).map(role => {
      return role.id
    })
    // Update user in DB
    this.userService.updateUser(employee.id, employee).subscribe(
      data => {
        console.log('updateUser: ', data.body)
        var employee2: any = { ...data.body }
        // Update user roles in DB
        this.userService.removeRoles(employee2.id, rolesIdsToRemove).subscribe(
          data => {
            if (roleIds.length) {
              var employee3: any = { ...data.body }
              this.userService.addRoles(employee3.id, roleIds).subscribe()
            }
          }
        )
      }
    )
    this.reloadRestaurant()
    this.cancelEdition()
  }

  cancelEdition() {
    this.resetSelectedEmployee();
    this.updateForm();
    this.resetModes();
  }

  employeeDeletionMode() {
    this.modes.deletionConfirmation = true
  }

  onDeletionConfirmation(event) {
    const employee = { ...this.selectedEmployee }
    const confirmDeletion = event.target.value
    console.log('confirmDeletion: ', confirmDeletion)
    if (confirmDeletion === "confirmDeletion") {
      console.log('deletion !')
      this.userService.deleteUser(employee.id).subscribe(
        data => {
          console.log(data.body)
        }
      )
    }
    console.log('deletion done or cancelled')
    this.modes.deletionConfirmation = false

    this.reloadRestaurant();
    this.cancelEdition();
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

  reloadRestaurant() {
    this.onRestaurantModifications.emit()
  }

}
