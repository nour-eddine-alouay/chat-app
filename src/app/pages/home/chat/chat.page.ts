import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  name = "Sender";
  message = "";
  isLoading = false;
  currentUserId = 1;

  chats: Array<any> = [
    {id: 1, sender: 1, message: "Hi"},
    {id: 2, sender: 2, message: "Hello?"},
  ];

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {

  }

}
