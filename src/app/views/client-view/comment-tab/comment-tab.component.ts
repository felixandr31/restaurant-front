import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-tab',
  templateUrl: './comment-tab.component.html',
  styleUrls: ['./comment-tab.component.css']
})
export class CommentTabComponent implements OnInit {

  @Input() user: any;
  @Input() booking: any;

  constructor() { }

  ngOnInit() {
  }

}
