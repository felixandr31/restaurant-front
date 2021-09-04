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
      lastName: 'Marley',
      roles: [
        { name: 'Waiter' }
      ],
    },
  ];
  public selectedEmployee = {
    // firstName: '',
    // lastName: '',
    // roles: [
    //   { name: '' }
    // ],
  };

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm(this.employees);
  }

  createForm(employees) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // email: ['', EmailValidator],
      waiter: [false, Validators.required],
      cook: [false, Validators.required]
    })
  }

  // list recoie une liste d'objet [{}] et renvoie l'object employee{} sélectionné
  employeeSelection(event) {
    this.selectedEmployee = event;
    console.log('selected employee: ' + this.selectedEmployee)
  }

  saveEmployee() {

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
  }


}
