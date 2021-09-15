import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, OnChanges {

  @Input() employees: any[];
  @Output() onEmployeeSelection = new EventEmitter()

  constructor() {
  }

  employeeSelection(event) {
    this.onEmployeeSelection.emit(event.target.value);
  };

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {

  }




}
