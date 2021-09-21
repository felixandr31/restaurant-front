import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {

  @Input() user: any;
  @Output() onFriendRemoval = new EventEmitter();

  public friends = []

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.user.friends.length) {
      const queries = this.user.friends.map(friendId => this.userService.getUserById(friendId))
      forkJoin(queries).subscribe(res => {
        this.friends = res.map((res: any )=> res.body)
        console.log("friends in list", this.friends)
      })
    }
    else {
      this.friends = []
    }
  }

  removeFriend(event) {
    const friendId = event
    this.userService.removeFriend(this.user.id, friendId)
      .subscribe(data => {
        this.onFriendRemoval.emit(event)
        this.userService.removeFriend(friendId, this.user.id).subscribe(
          data => {
            console.log('user removed from friend friends', data)
          }
        )
      })
  }
}
