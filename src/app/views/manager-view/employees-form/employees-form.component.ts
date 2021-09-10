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
    id: 0,
    firstName: '',
    lastName: '',
    roles: [],
  }

  public selectedEmployee: any

  empRoles: any[];
  savedEmployee: any;
  editForm: FormGroup;
  creationForm: FormGroup;

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
    console.log('employees on init', this.employees)
    this.resetSelectedEmployee();
    // this.createForms();
  }

  // créé tous les champs requis, remplis firstName et lastName avec selectedEmployee mais ne coche pas les checkboxs
  createForms(form) {
    // form = new FormGroup({});
    // form = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   cook: ['', Validators.required],
    //   waiter: ['', Validators.required],
    // });

        // roles: new FormArray([
        //   this.formBuilder.group({
        //     id: ['61309cb8009435126fc70797', Validators.required],
        //     name: ['Cook', Validators.required],
        //   }),
        //   this.formBuilder.group({
        //     id: ['613721e07f57fb321327b629', Validators.required],
        //     name: ['Waiter', Validators.required],
        //   })
        // ]),

    // this.roles.push(
    //   this.formBuilder.group({
    //     id: ['61309cb8009435126fc70797', Validators.required],
    //     name: ['Cook', Validators.required],
    //   },
    //   {
    //     id: ['613721e07f57fb321327b629', Validators.required],
    //     name: ['Waiter', Validators.required],
    //   })
    // )
  }

  resetSelectedEmployee() {
    this.selectedEmployee = this.defaultFormValues
  }

  // updateForm(form) {
  //   form.patchValue(this.selectedEmployee)
  //   this.updateRolesCheckbox();
  // }

  onSubmit() {

  }

  employeeSelection(event) {
    this.selectedEmployee = this.employees.find(employee => employee.id === event)
    // this.createForms(this.editForm)
    // this.updateForm(this.editForm);
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

  createEmployee(event) {

    console.log('form values:', this.creationForm.controls)
    console.log('event:', event)


  }

  saveNewEmployee() {
    this.savedEmployee = this.creationForm.value;
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
    console.log('Cancel Edition')
    this.resetSelectedEmployee();
    // this.updateForm(this.editForm);
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
    // this.updateForm(this.creationForm);
  }


}
