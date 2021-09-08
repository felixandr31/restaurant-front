import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent implements OnInit {

  @Output() onLogIn = new EventEmitter();

  signInMode = false;

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
          id: ['613721b77f57fb321327b626', Validators.required],
          name: ['Client', Validators.required],
        })
      ]),
      friends: new FormArray([])
    })
  }

  logIn() {
    this.user = this.userService.getUsers().subscribe(
      data => {
        const res = Object.values(data.body);
        if (res.find(user => user.lastName === this.logGroup.controls.lastName.value)) {
          // TODO : quand le mdp est géré par le back, remplacer le null par ce qui va bien...
          let user = res.find(user => user.lastName === this.logGroup.controls.lastName.value && user.password === null)
          this.onLogIn.emit(user)
          return Object.values(user)
        } else {
          alert('User not found')
        }
      },
      err => {
        console.log('error', err)
      }
    )
  }

  clearFields() {

  }

  displaySignIn() {
    this.signInMode = true
  }

  signIn() {
    console.log('form values: ', this.signInGroup.value)
    // alert(this.signInGroup.status)

    const newUser = this.signInGroup.value
    console.log('newUser', newUser)


    this.userService.postUser(newUser).subscribe(
      data => {
        const res = Object.assign({}, data.body);
        console.log(data.body)
        this.user = {...res}
        console.log(this.user)
        // login not working yet
        // this.userService.login(this.user.lastName, this.user.password)
      },
      err => {
        console.log('error', err)
      }
    )


  }



}
