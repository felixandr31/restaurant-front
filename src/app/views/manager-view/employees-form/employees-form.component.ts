import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  // @Input() employee: {};
  public employees: any = [
    {
      name: 'Tim',
      roles: [
        { value: 'Client' },
        { value: 'Cook' }
      ],
    },
    {
      name: 'Roger',
      roles: [
        { value: 'Cook' },
        { value: 'Waiter' }
      ],
    },
    {
      name: 'Bob',
      roles: [
        { value: 'Waiter' }
      ],
    },
  ];
  public selectedEmployee = {
    name: '',
    roles: [
      { value: '' }
    ],
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
      name: ['', Validators.required],
      waiter: [false, Validators.required],
      cook: [false, Validators.required]
    })
  }

  SelectEmployee(event) {
    this.selectedEmployee = event;
    console.log("event list to form" + event)
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
      name: '',
      roles: [
        { value: '' }
      ],
    };
    console.log(this.selectedEmployee);
  }


}
