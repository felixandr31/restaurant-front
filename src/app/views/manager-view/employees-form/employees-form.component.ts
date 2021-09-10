import { Component, OnInit, Input, SimpleChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, EmailValidator } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  @Input() user: any;
  @Input() managerRestaurant: any;

  public employees = [
  ];

  public defaultFormValues = {
    firstName: '',
    lastName: '',
    roles: [],
  }

  public selectedEmployee: any

  empRoles: any[];
  savedEmployee: any;
  form: FormGroup;

  cookChecked = false;
  waiterChecked = false;
  method: any

  modes = {
    "edition": false,
    "deletionConfirmation": false,
    "creation": false,
  }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }


  ngOnInit() {
    this.employees = this.managerRestaurant.employees
    this.resetSelectedEmployee();
    this.createForms();
  }

  // créé tous les champs requis, remplis firstName et lastName avec selectedEmployee mais ne coche pas les checkboxs
  createForms() {
    this.form = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      cook: [false, Validators.required],
      waiter: [false, Validators.required],
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
    console.log('form value', this.form.value)
    const user =
    {
      "firstName": "",
      "lastName": "",
      "password": "",
      "email": "",
      "roles": [
        {
          "id": "613721c67f57fb321327b627",
          "name": "Client"
        }
      ],
      "friends": [],
      "restaurants": [this.managerRestaurant]
    }
    // TODO: fill User with form values
    // this.userService.postUser().subscribe(

    // )

  }

  saveNewEmployee() {
    this.savedEmployee = this.form.value;
    console.log('savedEmployee: ', this.savedEmployee)
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
    this.modes.edition = !this.modes.edition
    this.modes.creation = false
  }
  ToggleCreate() {
    this.modes.creation = !this.modes.creation
    this.modes.edition = false
    this.resetSelectedEmployee();
    this.updateRolesCheckbox();
    this.updateForm();
  }


}
