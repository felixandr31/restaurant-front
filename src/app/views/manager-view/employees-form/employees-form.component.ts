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
  public formTemplate = {
    id: 0,
    firstName: '',
    lastName: '',
    roles: [
      { name: 'cook' },
      { name: 'waiter' }
    ],
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
    this.initialiseForm();
    this.createForm();
    this._patchValues();
    console.log('form.controls', this.f)
    console.log('roles', this.r.controls)
  }

  get f() { return this.form.controls; }
  // get array control
  get r() { return this.f.roles as FormArray; }

  createForm() {
    this.empRoles = this.selectedEmployee.roles;
    this.form = this.formBuilder.group({
      firstName: [this.selectedEmployee.firstName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      roles: new FormArray([]),
    });
  }

  _patchValues() {
    // loop each existing value
    this.empRoles.forEach(role => {
      this.r.push(
        this.formBuilder.group({
          name: [role.name, Validators.required],
        })
      )
    })
  }

  updateForm() {
    this.createForm();
    this._patchValues();
    console.log('roles', this.r.controls)
  }

  employeeSelection(event) {
    this.selectedEmployee = event;
    this.empRoles = this.selectedEmployee.roles;
    console.log('selectedEmployee', this.selectedEmployee);
    this.updateRoles();
    this.updateForm();
    this.editionMode = true;
  }
  
  updateRoles() {
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
    this.selectedEmployee =
    {
      id: 4,
      firstName: '',
      lastName: '',
      roles: [],
    };
    this.updateForm();
    this.editionMode = true;
  }

  saveEmployee() {
    this.savedEmployee = this.form.value;
    console.log('savedEmployee.firstName: ' + this.savedEmployee.firstName)
  }

  initialiseForm(){
    this.selectedEmployee = this.formTemplate;
  }

  cancelEdition() {
    this.initialiseForm();
    this.editionMode = false;
  }

  deleteEmployee() {

  }




}
