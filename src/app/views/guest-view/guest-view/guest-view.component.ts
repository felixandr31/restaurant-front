import { Component, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import {OK} from 'src/app/app.component';
import { RoleService } from 'src/app/services/data/role.service';

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})

export class GuestViewComponent implements OnInit, OnChanges {

  @Output() onLogIn = new EventEmitter();

  public logGroup: FormGroup;
  public signInGroup: FormGroup;

  public user: any = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roles: [],
    friends: []
  }

  public displaySignIn = false

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService) { }

  ngOnChanges() {

  }

  ngOnInit() {

    this.logGroup = this.formBuilder.group({
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.roleService.getRoles().subscribe(
      data => {
        const res: any = data.body
        const clientRole = res.find(e => e.name == 'Client')

        this.signInGroup = this.formBuilder.group({
          lastName: ['', Validators.required],
          firstName: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', Validators.required],
          roles: new FormArray([
            this.formBuilder.group({
              id: [clientRole.id, Validators.required],
              name: [clientRole.name, Validators.required],
            })
          ]),
          friends: new FormArray([]),
          bookings: new FormArray([])
        })
      }
    )

  }

  logIn() {
    const credentials = {
      lastName: this.logGroup.controls.lastName.value,
      password: this.logGroup.controls.password.value
    }

    this.userService.realLogin(credentials).subscribe(
      data => {
        if (data.status == OK) {
          this.user = data.body
          this.onLogIn.emit(this.user)
        }
      }
    )
  }


  toggleSignIn() {
    this.displaySignIn = !this.displaySignIn
  }

  signIn() {
    const newUser = this.signInGroup.value

    this.userService.postUser(newUser).subscribe(
      data => {
        const res = Object.assign({}, data.body);
        this.user = {...res}
        alert("user created, please log in with your credentials")
        this.toggleSignIn()
      },
      err => {
        console.log('error', err)
      }
    )
  }
}
