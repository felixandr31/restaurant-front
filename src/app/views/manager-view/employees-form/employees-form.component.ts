import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  public employees = [
    {
      id: 1,
      firstName: 'Tim',
      lastName: 'Cook',
      roles: [
        { name: 'cook' },
      ],
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Dilan',
      roles: [
        { name: 'waiter' }
      ],
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Cook',
      roles: [
        { name: 'cook' },
        { name: 'waiter' }
      ],
    },
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
  editionMode = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
    this.createForm();
    // this._patchValues();
    console.log('form.controls', this.f)
    console.log('roles', this.r.controls)
  }

  get f() { return this.form.controls; }
  // get array control
  get r() { return this.f.roles as FormArray; }

  // créé tous les champs requis, remplis firstName et lastName avec selectedEmployee mais ne coche pas les checkboxs
  createForm() {
    this.form = this.formBuilder.group({
      firstName: [this.selectedEmployee.firstName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      roles: new FormArray([
        this.formBuilder.group({
          id: ['61309cb8009435126fc70797', Validators.required],
          name: ['Cook', Validators.required],
        }),
        this.formBuilder.group({
          id: ['613721e07f57fb321327b629', Validators.required],
          name: ['Waiter', Validators.required],
        })
      ]),
    });
  }

  initializeForm(){
    this.selectedEmployee = this.defaultFormValues
  }

  updateForm() {
    this.form.patchValue(Object.keys(this.selectedEmployee))
    this.updateRolesCheckbox();
  }

  employeeSelection(event) {
    this.selectedEmployee = event;
    console.log('selectedEmployee', this.selectedEmployee);
    this.updateForm();
    this.editionMode = true;
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
    this.initializeForm();
    this.updateForm();
    this.editionMode = true;
  }

  saveEmployee() {
    this.savedEmployee = this.form.value;
    console.log('savedEmployee.firstName: ' + this.savedEmployee.firstName)
    // TODO: update user(ne fait rien dans les roles!) + add/remove role

  }

  cancelEdition() {
    this.initializeForm();
    this.editionMode = false;
  }

  deleteEmployee() {

  }




}
