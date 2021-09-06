import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.css']
})
export class GuestViewComponent implements OnInit {

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
        console.log('data body', data.body)
        const res = Object.values(data.body);
        console.log('results', res)
        res.forEach(user => console.log(user.lastName));
        // TODO : quand le mdp est géré par le back, remplacer le null par ce qui va bien...
        let user = res.find(user => user.lastName === this.logGroup.controls.lastName.value && user.password === null)
        console.log(user)
        // TODO remplir l'objet user le passer en output à app.components, mettre à jour le bool logged
        alert(Object.values(user))
        return user
      },
      err => {
        console.log('error', err)
      }
    )
  }

  clearFields() {

  }



}
