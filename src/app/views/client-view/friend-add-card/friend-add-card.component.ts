import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friend-add-card',
  templateUrl: './friend-add-card.component.html',
  styleUrls: ['./friend-add-card.component.css']
})
export class FriendAddCardComponent implements OnInit {

  @Input() person: any;

  constructor() { }

  ngOnInit() {
  }

}
