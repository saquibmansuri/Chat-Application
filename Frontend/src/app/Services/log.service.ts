import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from 'src/app/Components/logs/model';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private baseUrl: string = environment.base_url
  constructor(private http: HttpClient) { }
  
  getLogs(selectedTimeframe: string, startTime : string, endTime : string) {
    
    let params = new HttpParams();

    if (selectedTimeframe === 'custom') {
      params = params.set('timeframe', selectedTimeframe);
      params = params.set('startTime', startTime);
      params = params.set('endTime', endTime);
    } else {
      params = params.set('timeframe', selectedTimeframe);
    }

    return this.http.get<Log[]>(`${this.baseUrl}log`, { params });

    
  }
}
