import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, EmailValidator } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  public employees = [
    {
      id: 1,
      firstName: 'Tim',
      lastName: 'Cook',
      roles: [
        { name: 'cook' },
      ],
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Dilan',
      roles: [
        { name: 'waiter' }
      ],
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Cook',
      roles: [
        { name: 'cook' },
        { name: 'waiter' }
      ],
    },
    {
      id: "6139b8073f85bb4d08e61323",
      firstName: "Marius",
      lastName: "H",
      password: "password",
      email: "marius@gmail.com",
      roles: [
          {
              "id": "613721b77f57fb321327b626",
              "name": "client"
          },
          {
              "id": "61309cbf009435126fc70798",
              "name": "Manager"
          }
      ],
      friends: []
  }
  ];

  public defaultFormValues = {
    id: 0,
    firstName: '',
    lastName: '',
    roles: [],
  }

  public selectedEmployee: any

  empRoles: any[];
  savedEmployee: any;
  form: FormGroup;

  cookChecked = false;
  waiterChecked = false;

  modes = {
    "edition" : false,
    "deletionConfirmation" : false,
    "creation" : false
  }
  // confirmDeletion = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    // TODO : récupérer restaurant du manager puis sa liste employés
    // this.employees = this.userService. ().subscribe(
    //   data => {

    //   }
    //   err => {

    //   }
    // )
    this.initializeForm();
    this.createForm();
  }


  // créé tous les champs requis, remplis firstName et lastName avec selectedEmployee mais ne coche pas les checkboxs
  createForm() {
    this.form = this.formBuilder.group({
      firstName: [this.selectedEmployee.firstName, Validators.required],
      lastName: [this.selectedEmployee.lastName, Validators.required],
      roles: new FormArray([
        this.formBuilder.group({
          id: ['61309cb8009435126fc70797', Validators.required],
          name: ['Cook', Validators.required],
        }),
        this.formBuilder.group({
          id: ['613721e07f57fb321327b629', Validators.required],
          name: ['Waiter', Validators.required],
        })
      ]),
    });
  }

  initializeForm(){
    this.selectedEmployee = this.defaultFormValues
  }

  updateForm() {
    this.form.patchValue(this.selectedEmployee)
    this.updateRolesCheckbox();
  }

  employeeSelection(event) {
    this.selectedEmployee = event;
    console.log('selectedEmployee', this.selectedEmployee);
    this.updateForm();
    this.modes.edition = true;
    this.modes.creation = false;
  }

  updateRolesCheckbox() {
    this.empRoles = this.selectedEmployee.roles;
    this.cookChecked = false;
    this.waiterChecked = false;
    this.empRoles.forEach(role => {
      switch (role.name) {
        case 'waiter':
          this.waiterChecked = true;
          break;
        case 'cook':
          this.cookChecked = true;
          break;
      }
    })
  }

  createEmployee() {
    this.modes.creation = true;
    this.modes.edition = true;
    this.initializeForm();
    this.updateForm();

  }

  saveEmployee() {
    this.savedEmployee = this.form.value;
    console.log('savedEmployee: ', this.savedEmployee)
    // this.userService.updateUser().subscribe(
    //   data => {

    //   },
    //   err => {

    //   }
    // )
    // TODO: update user(ne fait rien dans les roles!) + add/remove role

    this.resetModes()
  }

  cancelEdition() {
    this.initializeForm();
    this.updateForm;
    this.resetModes()
  }

  deleteEmployee() {
    const employee = this.selectedEmployee
    console.log(employee)
    this.modes.deletionConfirmation = true
    const ans = this.confirmDeletion(event)
    console.log('ans: ', ans)
    // if(ans === "Delete"){
    //   this.userService.deleteUser(employee.id)
    //   this.deletionConfirmationMode = false
    // }else {
    //   this.deletionConfirmationMode = false
    // }
    // this.resetModes()
  }

  confirmDeletion(event){
    const ans = event.target.value
    return ans
  }

  resetModes(){
    console.log('resetModes')
    for(const mode in this.modes){
      console.log('mode', mode)
      console.log('this.modes[mode]', this.modes[mode])
      this.modes[mode] = false
    }
}



}
