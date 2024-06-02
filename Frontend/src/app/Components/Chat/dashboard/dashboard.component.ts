import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MessageService } from 'src/app/Services/message.service';
import { MessageResponse } from './model';
import { SignalRService } from 'src/app/Services/signal-r.service';
import { Message } from '../chat/model';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService,
    private message: MessageService,
    private router: Router,
    private signalR: SignalRService,
    private user: UserService) {
  }

  searchForm!: FormGroup
  user_name = this.auth.getName();
  isSearching: boolean = false;
  loggedInUserId = this.auth.getUserId();

  matchingMessages!: MessageResponse[]

  messages!: Message[]
  unReadMessages!: Message[]
  unReadCount!: number;

  connection = this.signalR.getConnection();

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: ['', Validators.required]
    })

    this.signalR.startConnection()
      .then()
      .catch(error => {
        console.log(error)
      });

      this.connection.on('BroadCast', (message) => {
        this.user.getUnReadMessages()
        .subscribe(response => {
        this.unReadMessages = response;
      })
      })   

  }

  onLogout() {
    this.auth.signOutExternal();
    this.auth.removetoken();
    this.router.navigate(['/login'])
  }

  onSearch() {
    this.isSearching = true;
    this.message.searchMessage(this.searchForm.value.searchInput)
      .subscribe((response: any) => {
        // console.log(response)
        this.matchingMessages = response
      }
      );
    // console.log(this.searchForm.value.searchInput);
  }
  onClose() {
    this.isSearching = false;
    this.searchForm.reset()

  }

}
