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
        { name: 'cook', checked: true },
        { name: 'waiter', checked: false }
      ],
    },
    {
      firstName: 'Bob',
      lastName: 'Dilan',
      roles: [
        { name: 'cook', checked: true },
        { name: 'waiter', checked: true }
      ],
    },
    {
      firstName: 'Bob',
      lastName: 'Cook',
      roles: [
        { name: 'cook', checked: false },
        { name: 'waiter', checked: true }
      ],
    },
  ];

  public selectedEmployee = {
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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // bind props with data from database
    this.empRoles = this.selectedEmployee.roles;
    // build reactive form skeleton
    this.createForm();
    // bind existing value to form control
    this.patchValues();
  }

  // get f() { return this.form.controls; }
  // get r() { return this.f.roles as FormArray; }


  createForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roles: new FormArray([]),
    });
  }

  patchValues() {
    // get array control
    const r = this.form.get('roles') as FormArray;
    // loop each existing value
    this.empRoles.forEach(obj => {
      r.push(new FormGroup({
        name: new FormControl(obj.name),
        checked: new FormControl(obj.checked)
      }))
    })
  }

  // updateForm() {
  //   this.form = this.formBuilder.group({
  //     firstName: [this.selectedEmployee.firstName, Validators.required],
  //     lastName: [this.selectedEmployee.lastName, Validators.required],
  //   });
  //   this.selectedEmployee.roles.forEach(obj => {
  //     this.r.push(new FormGroup({
  //       name: new FormControl(obj.name),
  //       checked: new FormControl(obj.checked)
  //     }))
  //   });
  //   // this.selectedEmployee.roles.forEach(obj => {
  //   //   this.r.push(this.formBuilder.group({
  //   //     name: [obj.name, Validators.required],
  //   //     checked: [obj.checked, Validators.required],
  //   //   }))
  //   // });

  //   console.log('this.form.controls (updateForm) : ' + this.form.controls.value)
  // }


  employeeSelection(event) {

      this.selectedEmployee = event;
      // this.updateForm();
    }

  createEmployee() {
      this.selectedEmployee =
      {
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
