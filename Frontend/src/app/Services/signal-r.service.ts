import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  loggedInUserToken = this.auth.getToken();
  private connection!: HubConnection;

  constructor(private auth: AuthService) {

    this.connection = new HubConnectionBuilder()
      .withUrl(`http://localhost:7218/hub/chat?access_token=${this.loggedInUserToken}`)
      .build();
  }

  startConnection(): Promise<void> {
    return this.connection.start();
  }

  getConnection(): HubConnection {
    return this.connection;
  }

}
