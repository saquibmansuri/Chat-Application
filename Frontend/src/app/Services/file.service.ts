import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = "http://localhost:7218/api/"

  constructor(private http: HttpClient) { }

  sendFile(file: File,receiverId: string,  caption: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('receiverId', receiverId);
    formData.append('caption', caption);
  
    return this.http.post<any>(`${this.baseUrl}file/upload`, formData);
  }

  downloadFile(fileId? : number){
    return this.http.get<any>(`${this.baseUrl}file/download?fileId=${fileId}`, {
      responseType: 'blob' as 'json' 
    });
  }
}
