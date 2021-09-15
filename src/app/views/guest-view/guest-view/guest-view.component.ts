import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';
import {OK} from 'src/app/app.component';

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})

export class GuestViewComponent implements OnInit {

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
    private userService: UserService) { }

  ngOnInit() {

    this.logGroup = this.formBuilder.group({
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.signInGroup = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      roles: new FormArray([
        this.formBuilder.group({
          id: ['613721c67f57fb321327b627', Validators.required],
          name: ['Client', Validators.required],
        })
      ]),
      friends: new FormArray([]),
      bookings: new FormArray([])
    })
  }

  logIn() {
    const credentials = {
      lastName: this.logGroup.controls.lastName.value,
      password: this.logGroup.controls.password.value
    }

    this.userService.realLogin(credentials).subscribe(
      data => {
        console.log('log in data', data)
        if (data.status == OK) {
          this.user = data.body
          console.log('user', this.user)
          this.onLogIn.emit(this.user)
        }
      }
    )
  }


  toggleSignIn() {
    this.displaySignIn = !this.displaySignIn
  }

  signIn() {
    console.log('form values: ', this.signInGroup.value)
    // alert(this.signInGroup.status)

    const newUser = this.signInGroup.value
    console.log('newUser', newUser)

    this.userService.postUser(newUser).subscribe(
      data => {
        const res = Object.assign({}, data.body);
        this.user = {...res}
        console.log(this.user)
        alert("user created, please log in with your credentials")
        this.toggleSignIn()

        // login not working yet
        // this.userService.login(this.user.lastName, this.user.password)
      },
      err => {
        console.log('error', err)
      }
    )
  }
}
