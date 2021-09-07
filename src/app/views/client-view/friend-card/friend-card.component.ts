import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/data/user.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css']
})
export class FriendCardComponent implements OnInit {

  @Input() friend: any;
  @Output() onFriendRemoval = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeFriend(event) {
    this.onFriendRemoval.emit(event.target.value);
    console.log('amis à enlever', event.target.value)
  }
}
