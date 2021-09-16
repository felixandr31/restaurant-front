import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnChanges {

  @Input() managerRestaurant: any;
  @Output() onEmployeeSelection = new EventEmitter()
  public employees: any[]

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(){
    this.employees = this.managerRestaurant.employees
  }

  employeeSelection(event) {
    this.onEmployeeSelection.emit(event.target.value);
  }

}
