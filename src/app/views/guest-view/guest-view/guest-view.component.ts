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

  public logGroup: FormGroup;

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



}
