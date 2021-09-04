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
      firstName: 'Tim',
      lastName: 'Cook',
      roles: [
        { name: 'Client' },
        { name: 'Cook' }
      ],
    },
    {
      firstName: 'Roger',
      lastName: 'Federer',
      roles: [
        { name: 'Cook' },
        { name: 'Waiter' }
      ],
    },
    {
      firstName: 'Bob',
      lastName: 'Cook',
      roles: [
        { name: 'Waiter' }
      ],
    },
  ];

  public selectedEmployee = {
    firstName: '',
    lastName: '',
    roles: [
      { name: '' }
    ],
  };

  public savedEmployee: any;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get f() { return this.form.controls; }
  get r() { return this.f.roles as FormArray; }


  createForm() {
    this.form = this.formBuilder.group({
      firstName: [this.selectedEmployee.firstName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      roles: new FormArray([])
    })
  }

  employeeSelection(event) {
    this.selectedEmployee = event;
    console.log('selected employee: ' + this.selectedEmployee.firstName)
    this.createForm();
  }

  saveEmployee(event) {
    console.log('event: ' + event)
    this.savedEmployee = event;
    console.log('savedEmployee: ' + this.savedEmployee)
  }

  cancelEdition() {

  }

  deleteEmployee() {

  }

  createEmployee() {
    this.selectedEmployee =
    {
      firstName: '',
      lastName: '',
      roles: [
        { name: '' }
      ],
    };
    console.log(this.selectedEmployee);
    this.createForm();
  }



}
