import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {ModalController, PopoverController} from '@ionic/angular'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // @ViewChild('new_chat') modal: ModalController | undefined;
  // @ViewChild('popover') popover: PopoverController | undefined;

  segment = "chats";
  open_new_chat = false;
  users = [
    {id: 1, name: "kingsley", photo: "https://i.pravatar.cc/380"},
    {id: 1, name: "Avery", photo: "https://i.pravatar.cc/381"},
    {id: 3, name: "A. Mohamed", photo: "https://i.pravatar.cc/382"}
  ];
  chatRooms = [
    {id: 1, name: "Aksel", photo: "https://i.pravatar.cc/381", lastmessage: "do whatever you want I don't care!", time:"18:04"},
    {id: 2, name: "Samir", photo: "https://i.pravatar.cc/382", lastmessage: "thanks", time:"01:15"},
    {id: 3, name: "Halabi Jr", photo: "https://i.pravatar.cc/383", lastmessage: "come later then", time:"06:15"},
    {id: 4, name: "Ziad", photo: "https://i.pravatar.cc/384", lastmessage: "since when?", time:"01:54"},
    {id: 5, name: "Nabil", photo: "https://i.pravatar.cc/385", lastmessage: "ok", time:"07:23"},
    {id: 6, name: "Yu Sam", photo: "https://i.pravatar.cc/386", lastmessage: "kk don't care", time:"20:06"}
  ]

  constructor(private router: Router) {
    
  }

  logout() {
    // this.popover?.dismiss();
  }

  onSegmentChanged(event: any){
    console.log(event.detail.value);
  }

  onWillDismiss(event: any) {
    console.log(event);
  }

  cancel() {
    this.open_new_chat = false;
  }

  newChat() {
    this.open_new_chat = true;
  }

  startChat(item: any) {

  }

  getChat(item: any) {
    this.router.navigate(['/', 'chats', item.id])
  }
}
