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
    // Event contient bcp d'infos, je traite ici l'event pour n'envoyer que l'objet employee correspondant à la selection

    // event.target.value = valeurs de firstName+lastName sélectionné
    //Sépare firstname et lastname
    const splited = event.target.value.split(' ');
    console.log('first: ' + splited[0]);
    console.log('last: ' + splited[1]);

    const employee = this.employees.filter(obj => {
      return obj === splited[1];
    })
    console.log('employee: ' + employee.lastName);
    // employee.lastName = undefined...


  };

  // filterByLastName(employee) {
  //   if (employee.lastName === this.splited[1]) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  // filterByfirstName(employee) {
  //   if (employee.firstName === this.splited[0]) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  ngOnInit() {

  }




}
