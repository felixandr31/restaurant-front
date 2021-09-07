import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-friend-add-card',
  templateUrl: './friend-add-card.component.html',
  styleUrls: ['./friend-add-card.component.css']
})
export class FriendAddCardComponent implements OnInit {

  @Input() person: any;
  @Output() onFriendAddition = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  friendAdded(event) {
    this.onFriendAddition.emit(event.target.value)
    console.log('personne à ajouter', event.target.value)
  }

}
