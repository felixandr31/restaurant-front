import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';

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
    this.friends = this.user.friends
  }

  removeFriend(event) {
    const friendId = [event]
    this.userService.removeFriend(this.user.id, friendId)
    .subscribe(data => {
      this.onFriendRemoval.emit(event)
    })
  }
}
