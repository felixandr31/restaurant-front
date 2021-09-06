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
      { name: 'cook', checked: true },
      { name: 'waiter', checked: false }
    ],
  };;

  empRoles: any;
  savedEmployee: any;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // bind props with data from database
    this.empRoles = this.selectedEmployee.roles;
    // build reactive form skeleton
    this.createForm();
    // bind existing value to form control
    this._patchValues();
    console.log('form.controls', this.f)

  }

  get f() { return this.form.controls; }
  // get array control
  get r() { return this.f.roles as FormArray; }

  createForm() {
    this.form = this.formBuilder.group({
      firstName: [this.selectedEmployee.firstName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      roles: new FormArray([
        // this.formBuilder.group({
        //   name: ['cook', Validators.required],
        //   checked: [true, Validators.required],
        // },
        // {
        //   name: ['waiter', Validators.required],
        //   checked: [false, Validators.required],
        // })
      ]),
    });
  }

  _patchValues() {
    // loop each existing value
    this.empRoles.forEach(role => {
      this.r.push(
        new FormGroup({
          name: new FormControl(role.name),
          checked: new FormControl(role.checked)
        }))
    })
  }

  updateForm() {
    this.empRoles = this.selectedEmployee.roles;
    this.form.patchValue({
      firstName: this.selectedEmployee.firstName,
      lastName: this.selectedEmployee.lastName,
    })
    this.r.controls.splice(0, 2, this.empRoles)
  }

  employeeSelection(event) {
    // console.log(event)
    console.log(this.selectedEmployee)
    this.selectedEmployee = this.employees.find(emp => {
     return emp.id === event;
    }
      );
    console.log(this.selectedEmployee)
    // this.updateForm();
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
