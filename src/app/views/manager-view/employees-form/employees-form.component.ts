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
        { name: 'cook', checked: true },
        { name: 'waiter', checked: false }
      ],
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Dilan',
      roles: [
        { name: 'cook', checked: true },
        { name: 'waiter', checked: true }
      ],
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Cook',
      roles: [
        { name: 'cook', checked: false },
        { name: 'waiter', checked: true }
      ],
    },
  ];

  public selectedEmployee = {
    id: 0,
    firstName: '',
    lastName: '',
    roles: [
      { name: 'cook', checked: false },
      { name: 'waiter', checked: false }
    ],
  };;

  empRoles: any[];
  savedEmployee: any;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // bind props with data from database
    this.empRoles = this.selectedEmployee.roles;
    // build reactive form skeleton
    this.createForm();
    // bind existing value to form control
    this.patchValues();
    console.log(this.form)
  }

  get f() { return this.form.controls; }
  // get array control
  get r() { return this.f.roles as FormArray; }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: [this.selectedEmployee.firstName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      roles: new FormArray([]),
    });
  }

  patchValues() {
    // loop each existing value
    this.empRoles.forEach(role => {
      this.r.push(new FormGroup({
        name: new FormControl(role.name),
        checked: new FormControl(role.checked)
      }))
    })
  }

  // updateForm() {
  //   this.form = this.formBuilder.group({
  //     firstName: [this.selectedEmployee.firstName, Validators.required],
  //     lastName: [this.selectedEmployee.lastName, Validators.required],
  //   });
  //   this.patchValues();
  // }

  employeeSelection(event) {
    this.selectedEmployee = this.employees.find(emp => {
      return emp.id === event;
    })
    console.log(this.selectedEmployee)
    // this.patchValues();
  }

  createEmployee() {
    this.selectedEmployee =
    {
      id: 4,
      firstName: '',
      lastName: '',
      roles: [
        { name: 'cook', checked: false },
        { name: 'waiter', checked: false }
      ],
    };
    this.patchValues();
    console.log('Object.keys(this.selectedEmployee): ' + Object.keys(this.selectedEmployee))
  }

  saveEmployee() {
    this.savedEmployee = this.form.value;
    console.log('savedEmployee.firstName: ' + this.savedEmployee.firstName)
  }


  cancelEdition() {

  }

  deleteEmployee() {

  }




}
