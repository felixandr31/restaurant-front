import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html',
  styleUrls: ['./user-finder.component.css']
})
export class UserFinderComponent implements OnInit {

  @Input() user;

  // TO DO initiate users

  private users: any = []

  public notFriends: any = []

  constructor() { }

  ngOnInit() {
    this.notFriends = this.findNotFriendedUsers(this.users, this.user);
  }

  findNotFriendedUsers(users, user) {
    const friends = user.friends;
    const list = users
      .filter(user => user.name != user.name)
      .filter(user => {
        return !user.friends.some(friend => friend.name === user.name);
      })
    return list;
  }
}
