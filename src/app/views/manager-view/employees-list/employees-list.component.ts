import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @Input() employees: any;

  public editingEmployee = null;

  onEmployeeSelection(employee) {
    this.editingEmployee = employee;
  }

  createEmployee() {

    this.editingEmployee = {
      role: '',
      name: '',
    };
  }

  // reloadCategory() {
  //   this.selectCategory(this.selectedCategory)
  // }


  // selectCategory(selectedCategory) {

  //   this.selectedCategory = selectedCategory

  //   this.graphDatabaseService.getAgentsOfCategory(selectedCategory).then(res => {
  //     // liste des agents présent en base
  //     this.editableAgents = res
  //     // CategoriesProperties liées à la catégorie sélectionnée
  //     this.selectedCategoryProperties = CategoriesProperties[selectedCategory]
  //   })
  // }


  constructor() { }

  ngOnInit() {
  }

}
