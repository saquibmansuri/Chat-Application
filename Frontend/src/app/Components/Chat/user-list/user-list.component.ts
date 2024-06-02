import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Components/Chat/user-list/model';
import { SignalRService } from 'src/app/Services/signal-r.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users!: User[];

  unReadMessages = this.user.unReadMessages;

  connection = this.signalR.getConnection();

  

  constructor(private user: UserService, private signalR: SignalRService) {
  }


  ngOnInit() {
    this.user.getUsers()
      .subscribe(response => {
        this.users = response;
        console.log(response);
      })

    this.user.getUnReadMessages()
      .subscribe(response => {
        console.log(response);
        this.unReadMessages = response;
      })
     

      this.connection.on('BroadCast', (message) => {
        this.user.getUnReadMessages()
        .subscribe(response => {
        this.unReadMessages = response;
        console.log("Unread message from User list" , response)
      })
      })

      this.user.unReadMessages$.subscribe((messages: any[]) => {
        this.unReadMessages = messages;})

  }

  getUnReadMessageCount(userId: String) {
    const userUnreadMessages = this.unReadMessages.find(item => item.senderId === userId);

    if (!userUnreadMessages || !userUnreadMessages.messages || userUnreadMessages.messages.length === 0) {
      return 0;
    }
    
    return userUnreadMessages.messages.length;
  }

  
}
