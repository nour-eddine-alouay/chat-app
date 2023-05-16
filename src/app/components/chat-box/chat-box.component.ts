import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent  implements OnInit {

  @Input() chat: any | undefined;
  @Input() current_user_id: number | undefined;

  constructor() { }

  ngOnInit() {}

}
