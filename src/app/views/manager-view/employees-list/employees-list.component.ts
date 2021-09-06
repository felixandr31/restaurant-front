import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @Input() employees: any;
  @Output() onEmployeeSelection = new EventEmitter()

  constructor() {
  }

  employeeSelection(event) {
    // console.log('event :' + event);
    // Event contient bcp d'infos, je traite ici l'event pour n'envoyer que l'objet Json employee correspondant à la selection

    // event.target.value = [valeurs]="employee.id" (dans html)
    console.log(event.target.value);
    this.onEmployeeSelection.emit(event.target.value);
  };

  ngOnInit() {

  }




}
