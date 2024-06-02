import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:7218/api/"
  constructor(private http: HttpClient) { }

  
  private unReadMessagesSubject = new BehaviorSubject<any[]>([]);
  unReadMessages$: Observable<any[]> = this.unReadMessagesSubject.asObservable();

  unReadMessages : any[] = []

  updateUnreadMessages(messages: any[]) {
    this.unReadMessages = messages;
    this.unReadMessagesSubject.next(messages); // Notify subscribers
  }
  
  
  
  
  getUsers(){
    return this.http.get<any>(`${this.baseUrl}users`)
  }


  getUnReadMessages(){
    return this.http.get<any>(`${this.baseUrl}messages/unread`)
  }

  readMessages(array : number[]){
    return this.http.put<any>(`${this.baseUrl}messages/read`, array)
  }
}
