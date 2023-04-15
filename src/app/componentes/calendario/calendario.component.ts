import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  today: string = new Date().toISOString().split('T')[0];
  selectedDate: string = "";

  isInvalidDate(date: string): boolean {
    const invalidDate = new Date('2023-04-03').toISOString().split('T')[0];
    return date === invalidDate;
  }

  constructor() { }

  ngOnInit(): void {
    
  }

}
