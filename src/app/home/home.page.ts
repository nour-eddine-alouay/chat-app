import { Component, ViewChild } from '@angular/core';
import { Observable, take } from 'rxjs';
import {ModalController, PopoverController} from '@ionic/angular'
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('new_chat') modal: ModalController | undefined;
  @ViewChild('popover') popover: PopoverController | undefined;

  segment = "chats";
  open_new_chat = false;

  users: Observable<any>;
  // users = [
  //   {id: 1, name: "kingsley", photo: "https://i.pravatar.cc/380"},
  //   {id: 1, name: "Avery", photo: "https://i.pravatar.cc/381"},
  //   {id: 3, name: "A. Mohamed", photo: "https://i.pravatar.cc/382"}
  // ];
  chatRooms: Observable<any>;
  model : {
    icon: 'chatbuddles-outline',
    title: 'No Chat Rooms',
    color: 'danger'
  };
  // chatRooms = [
  //   {id: 1, name: "Aksel", photo: "https://i.pravatar.cc/381", lastmessage: "do whatever you want I don't care!", time:"18:04"},
  //   {id: 2, name: "Samir", photo: "https://i.pravatar.cc/382", lastmessage: "thanks", time:"01:15"},
  //   {id: 3, name: "Halabi Jr", photo: "https://i.pravatar.cc/383", lastmessage: "come later then", time:"06:15"},
  //   {id: 4, name: "Ziad", photo: "https://i.pravatar.cc/384", lastmessage: "since when?", time:"01:54"},
  //   {id: 5, name: "Nabil", photo: "https://i.pravatar.cc/385", lastmessage: "ok", time:"07:23"},
  //   {id: 6, name: "Yu Sam", photo: "https://i.pravatar.cc/386", lastmessage: "kk don't care", time:"20:06"}
  // ]

  constructor(
    private router: Router,
    private chatService: ChatService,
  ) {
    
  }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.chatService.getChatRooms();
    this.chatRooms = this.chatService.chatRooms;
    console.log('chat rooms: ',this.chatRooms)
  }

  logout() {
    this.popover.dismiss();
    console.log("logout started");
    this.chatService.auth.logout();
    this.router.navigateByUrl('/login');
    console.log("logout over");
  }

  onSegmentChanged(event: any){
    console.log(event.detail.value);
    this.segment = event.detail.value;
  }

  onWillDismiss(event: any) {
    console.log(event);
  }

  cancel() {
    console.log("cancel!")
    this.open_new_chat = false;
  }

  newChat() {
    this.open_new_chat = true;
    if(!this.users) this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers();
    this.users = this.chatService.users;

  }

  async startChat(item) {
    try {
      // this.global.showLoader();
      // create chatroom
      const room = await this.chatService.createChatRoom(item?.uid);
      console.log('room: ', room);
      this.cancel();
      const navData: NavigationExtras = {
        queryParams: {
          name: item?.name
        }
      };
      this.router.navigate(['/', 'home', 'chats', room?.id], navData);
      // this.global.hideLoader();
    } catch(e) {
      console.log(e);
      // this.global.hideLoader();
    }
  }

  getChat(item) {
    (item?.user).pipe(
      take(1)
    ).subscribe(user_data => {
      console.log('data: ', user_data);
      const navData: NavigationExtras = {
        queryParams: {
          name: user_data?.name
        }
      };
      this.router.navigate(['/', 'chats', item.id])
    });
  }

  getUser(user: any){
    return user;
  }
}
