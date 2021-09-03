import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @Input() employees: any;
  @Output() onEmployeeSelection = new EventEmitter()



  employeeSelection(event) {
    this.onEmployeeSelection.emit(event);
  }

  constructor() {

  }

  ngOnInit() {
  }


}
