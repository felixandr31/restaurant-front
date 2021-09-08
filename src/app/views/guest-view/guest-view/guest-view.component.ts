import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent implements OnInit {

  @Output() onLogIn = new EventEmitter();

  signInMode= false;

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

  toggleSignIn(){
    this.signInMode = true
  }

  signIn(){
  console.log('form values: ', this.signInGroup.value)
  console.log('form: ', this.signInGroup)
  console.log('form status: ', this.signInGroup.status)
  alert(this.signInGroup.status)

    // this.user = this.userService.getUsers().subscribe(
    //   data => {
    //     const res = Object.values(data.body);
    //     if (res.find(user => user.lastName === this.logGroup.controls.lastName.value)) {
    //       // TODO : quand le mdp est géré par le back, remplacer le null par ce qui va bien...
    //       let user = res.find(user => user.lastName === this.logGroup.controls.lastName.value && user.password === null)
    //       this.onLogIn.emit(user)
    //       return Object.values(user)
    //     } else {
    //       alert('User not found')
    //     }
    //   },
    //   err => {
    //     console.log('error', err)
    //   }
    // )
  }



}
