import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html',
  styleUrls: ['./user-finder.component.css']
})
export class UserFinderComponent implements OnInit, OnChanges {

  @Input() user;
  @Output() onFriendAddition = new EventEmitter();

  // TO DO initiate users

  private users: any = []

  public notFriends: any = []

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.findNotFriendedUsers(this.user);
  }

  findNotFriendedUsers(user) {
    const friends = user.friends;
    let list = []
    this.userService.getUsers().subscribe(
      data => {
        const res = Object.values(data.body)
        return this.notFriends = res.filter(person => person.id != user.id && !friends.map(f => f.id).includes(person.id))
      }
    )
  }

  friendAdded(event) {
    const friendId = event
    this.userService.addFriend(this.user.id, friendId).subscribe(
      data => {
        this.onFriendAddition.emit(event)
      }
    )
  }
}
