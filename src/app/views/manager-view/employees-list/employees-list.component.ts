import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnChanges {

  // @Input() employees: any[];
  @Input() managerRestaurant: any;
  @Output() onEmployeeSelection = new EventEmitter()
  public employees: any[];

  constructor() {
  }

  employeeSelection(event) {
    this.onEmployeeSelection.emit(event.target.value);
  };

  ngOnInit() {
    this.refreshEmployees(this.managerRestaurant)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.managerRestaurant){
      this.refreshEmployees(this.managerRestaurant)
    }
  }

refreshEmployees(managerRestaurant){
  this.employees = managerRestaurant.employees
}


}
