import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html',
  styleUrls: ['./user-finder.component.css']
})
export class UserFinderComponent implements OnInit {

  @Input() users: any;
  @Input() client: any;

  private notFriends: any = []

  constructor() { }

  ngOnInit() {
    this.notFriends = this.findNotFriendedUsers(this.users, this.client);
  }

  findNotFriendedUsers(users, client) {
    const friends = client.friends;
    const list = users
      .filter(user => user.name != client.name)
      .filter(user => {
        return !user.friends.some(friend => friend.name === client.name);
      })
    return list;
  }
}
