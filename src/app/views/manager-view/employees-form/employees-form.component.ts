import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  @Input() employee: any;

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
    ) {
      console.log("construtor form : " + this.employee)
     }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createForm(this.employee);
    console.log("ngOnChanges form : " + this.employee)
  }

  createForm(employee) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      roles: new FormArray([])
    })
  }

  saveEmployee(){

  }

  cancelEdition() {

  }



}
