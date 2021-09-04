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
    console.log('first: ' + splited[0]);
    console.log('last: ' + splited[1]);

    // employee = {} ; obtenu en deux étapes car pas réussi avec then...
    const empLastName = this.employees.filter(obj => {
      return obj.lastName === splited[1];
    })
    // console.log('employee: ' + empLastName);
    const employee = this.employees.find(obj => {
      return obj.firstName === splited[0];
    })
    // console.log('employee: ' + employee);
    // console.log('employee.firstName: ' + employee.firstName);

    // essai avec filter / then / find
    // const employee = this.employees.filter(obj => {
    //   obj.lastName === splited[1];
    // }).then.find(obj2 => {
    //   return obj2.firstName === splited[0];
    // })

    this.onEmployeeSelection.emit(employee);


  };

  ngOnInit() {

  }




}
