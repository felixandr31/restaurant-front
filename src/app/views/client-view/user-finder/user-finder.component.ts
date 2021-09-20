import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';
import { forkJoin } from 'rxjs';

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
    this.userService.getUsers().subscribe(
      data => {
        const res = Object.values(data.body)
        console.log('res1', res)
        if (this.user.friends.length) {
          const queries = user.friends.map(friendId => this.userService.getUserById(friendId))
          forkJoin(queries).subscribe((data: any) => {
            const friends = data.map(data => data.body)
            console.log('friends', friends)
            console.log('res & data', res, data)
            return this.notFriends = res.filter(person => person.id != user.id && !friends.map(f => f.id).includes(person.id))
          })
        }
        else {
          return this.notFriends = res.filter(person => person.id != user.id)
        }
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
