import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/Services/log.service';
import { Log } from './model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit{
  
  selectedTimeframe: string = '5';
  customStartTime: string = '';
  customEndTime: string = '';
  logs: Log[] = [];

  selectedColumns: string[] = ['logId', 'ipAddress', 'requestBody', 'timeStamp'];

  columnVisibility: { [key: string]: boolean } = {
    'logId': true,
    'ipAddress': true,
    'requestBody': true,
    'timeStamp': true,
  };

  constructor(private log: LogService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    let startTime = '';
    let endTime = '';

    if (this.selectedTimeframe === 'custom') {
      startTime = this.customStartTime;
      endTime = this.customEndTime;
    }
  
    this.log.getLogs(this.selectedTimeframe, startTime, endTime)
      .subscribe((data) => {
        this.logs = data;
      });
  }

  onTimeframeChange() {
    if (this.selectedTimeframe !== 'custom') {
      this.customStartTime = ''; 
      this.customEndTime = ''; 
     
    }
    this.getLogs();
  }

  onCustomSelect(){
    let startTime = '';
    let endTime = '';
    
    if (this.selectedTimeframe == 'custom') {
    
    console.log(startTime);
    console.log(endTime);
    this.getLogs()
    }
  }

  onColumnVisibilityChange(column: string) {
    this.columnVisibility[column] = !this.columnVisibility[column];
  }

   
  }

