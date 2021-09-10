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
  form: FormGroup;

  cookChecked = false;
  waiterChecked = false;
  method: any

  modes = {
    "edition": false,
    "deletionConfirmation": false,
    "creation": false
  }

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }


  ngOnInit() {
    this.employees = this.managerRestaurant.employees
    console.log('employees on init', this.employees)
    this.initializeForm();
    this.createForms();
  }

  // créé tous les champs requis, remplis firstName et lastName avec selectedEmployee mais ne coche pas les checkboxs
  createForms() {
    this.form = this.formBuilder.group({
      firstName: [this.selectedEmployee.firstName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      roles: new FormArray([
        // this.formBuilder.group({
        //   id: ['61309cb8009435126fc70797', Validators.required],
        //   name: ['Cook', Validators.required],
        // }),
        // this.formBuilder.group({
        //   id: ['613721e07f57fb321327b629', Validators.required],
        //   name: ['Waiter', Validators.required],
        // })
      ]),
    });

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

  initializeForm() {
    this.selectedEmployee = this.defaultFormValues
  }

  updateForm() {
    this.form.patchValue(this.selectedEmployee)
    this.updateRolesCheckbox();
  }

  onSubmit(){

  }

  employeeSelection(event) {
    // this.selectedEmployee = event;
    this.selectedEmployee = this.employees.find(employee => employee.id === event)
    console.log('selectedEmployee', this.selectedEmployee);
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

  createEmployee(event) {
    console.log('Employee Created:', this.form.value)
    console.log('roles:', this.form.controls.roles)


  }

  toggleEmployeeCreation(){
    this.modes.creation = true;
    this.modes.edition = true;
    this.initializeForm();
    this.updateForm();
  }

  saveNewEmployee(){
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

  updateEmployee(){
    console.log('update method')
  }

  cancelEdition() {
    console.log('Cancel Edition')
    this.initializeForm();
    this.updateForm();
    this.resetModes()
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



}
