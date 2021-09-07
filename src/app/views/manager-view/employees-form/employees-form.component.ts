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

  public selectedEmployee = {
    id: 0,
    firstName: '',
    lastName: '',
    roles: [
      { name: 'cook' },
      { name: 'waiter' }
    ],
  };;

  empRoles: any[];
  savedEmployee: any;
  form: FormGroup;

  cookChecked= false;
  waiterChecked= false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
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
    this._patchValues();
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
    this.empRoles = this.selectedEmployee.roles;
    this.form.patchValue({
      firstName: this.selectedEmployee.firstName,
      lastName: this.selectedEmployee.lastName,
    })
    console.log('form.controls', this.f)
    console.log('roles', this.r.controls)
    // console.log('before splice', this.r.controls)
    // this.r.splice(0, this.r.length,)
    // console.log('after splice',this.r.controls)
    // this._patchValues()
  }

  employeeSelection(event) {
    this.selectedEmployee = event;
    console.log('this.selectedEmployee', this.selectedEmployee);
    this.updateForm();
  }

  createEmployee() {
    this.selectedEmployee =
    {
      id: 4,
      firstName: '',
      lastName: '',
      roles: [
        { name: 'cook' },
        { name: 'waiter' }
      ],
    };
    this.updateForm();
    console.log('this.selectedEmployee', this.selectedEmployee)
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
