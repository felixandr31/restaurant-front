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

    // event.target.value = valeurs de firstName+lastName sélectionné
    //splited = ['firstName', 'lastName']
    const splited = event.target.value.split(' ');

    // employee = {} ; obtenu en deux étapes car pas réussi avec then...
    const empLastName = this.employees.filter(obj => {
      return obj.lastName === splited[1];
    })
    const employee = empLastName.find(obj => {
      return obj.firstName === splited[0];
    })

    // essai avec filter / then / find
    // const employee = this.employees.filter(emp => {
    //   return emp.lastName === splited[1];
    // }).then(() => {
    //   return emp.find(emp.firstName === splited[0])
    // })

    this.onEmployeeSelection.emit(employee);
  };

  ngOnInit() {

  }




}
