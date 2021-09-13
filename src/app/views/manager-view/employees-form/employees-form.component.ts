import { Component, OnInit, Input, SimpleChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, EmailValidator } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import { forEach } from '@angular/router/src/utils/collection';
import { RestaurantService } from 'src/app/services/data/restaurant.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  @Input() user: any;
  @Input() managerRestaurant: any;
  @Input() managerRestaurantId: any;

  public employees = [
  ];

  public defaultFormValues = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    restaurantId:'',
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

  public selectedEmployee: any

  private empRoles: any[];
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

  private modes = {
    "edition": false,
    "deletionConfirmation": false,
    "creation": false,
    "selectedMode": ''
  }



  constructor(private formBuilder: FormBuilder,
    private userService: UserService, private restaurantService: RestaurantService,) { }


  ngOnInit() {
    // this.availableRoles = this.roleServices...
    console.log('user: ', this.user)
    this.employees = this.managerRestaurant.employees
    this.managerRestaurantId = this.managerRestaurant.id
    this.resetSelectedEmployee();
    this.createForms();
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
    this.selectedEmployee = this.defaultFormValues
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
      this.saveNewEmployee()
    }
  }

  employeeSelection(event) {
    this.selectedEmployee = this.employees.find(employee => employee.id === event)
    this.updateForm();
    this.modes.edition = true;
    this.modes.creation = false;
  }

  updateRolesCheckbox() {
    this.empRoles = this.selectedEmployee.roles;
    this.cookChecked = false;
    this.waiterChecked = false;
    this.empRoles.forEach(role => {
      switch (role.name) {
        case 'waiter':
          this.waiterChecked = true;
          break;
        case 'cook':
          this.cookChecked = true;
          break;
      }
    })
  }

  createEmployee() {
    const result = this.selectedEmployee
    for (const key in this.form.value) {

      // update result fields with form values
      for (const k in result) {
        if (key === k) {
          result[k] = this.form.value[k]
        }
      }
      // Add roles Cook or Waiter to result
      if ((key === 'Cook' || key === 'Waiter') && this.form.value[key]) {
        result.roles.push(this.availableRoles.find(role =>
          role.name === key))
      }
    }
    result.restaurantId = this.managerRestaurantId

    this.userService.postUser(result).subscribe(
      data => {
        console.log(data.body)
        // TODO : utiliser id user pour ajouter aux employees
        const newEmployee: any = data.body
        this.restaurantService.addUserToRestaurant(this.managerRestaurantId, newEmployee.id).subscribe(
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
  }

  saveNewEmployee() {
    this.savedEmployee = this.form.value;
    console.log('savedEmployee: ', this.savedEmployee)

    // erase roles 'cook' and 'waiter' from selectedEmployee.roles
    // const newRoles = result.roles.filter(role => {
    //   console.log('role.name: ', role.name)
    //   role.name !== 'Cook' || role.name !== 'Waiter'
    // })
    // console.log('newRoles: ', newRoles)

    //  TODO:
    // this.userService.updateUser().subscribe(
    //   data => {

    //   },
    //   err => {

    //   }
    // )
    // this.userService.addRoles
    // if create : ajouter employee au restaurant


    // this.resetModes()
  }

  updateEmployee() {
    console.log('update method')
  }

  cancelEdition() {
    this.resetSelectedEmployee();
    this.updateRolesCheckbox();
    this.updateForm();
    this.resetModes();
  }

  employeeDeletionMode() {
    console.log('Delete method')
    const employee = this.selectedEmployee
    this.modes.deletionConfirmation = true
  }

  onDeletionConfirmation(event) {
    console.log('event onDeletionConfirmation', event)
    // const confirmDeletion = event
    // console.log('confirmDeletion: ', confirmDeletion)
    // if (confirmDeletion === "Delete") {
    //   console.log('deletion !')
    //   // this.userService.deleteUser(this.selectedEmployee.id)
    //   this.resetModes()
    // } else {
    //   console.log('deletion cancelled!')
    //   this.modes.deletionConfirmation = false
    // }
    // this.resetModes()
  }

  resetModes() {
    for (const mode in this.modes) {
      this.modes[mode] = false
    }
  }

  ToggleEdit() {
    this.modes.selectedMode = 'EDITION'
    this.modes.edition = !this.modes.edition
    this.modes.creation = false
  }
  ToggleCreate() {
    this.modes.selectedMode = 'CREATION'
    this.modes.creation = !this.modes.creation
    this.modes.edition = false
    this.resetSelectedEmployee();
    this.updateRolesCheckbox();
    this.updateForm();
  }


}
