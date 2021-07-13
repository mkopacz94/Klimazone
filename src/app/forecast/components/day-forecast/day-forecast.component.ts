import { Component, Input, OnInit } from '@angular/core';
import { DayForecast } from '../../models/dayForecast';

@Component({
  selector: 'app-day-forecast',
  templateUrl: './day-forecast.component.html',
  styleUrls: ['./day-forecast.component.css']
})
export class DayForecastComponent implements OnInit {

  weekDaysMap = new Map([
    [0, 'Niedz.'],
    [1, 'Pon.'],
    [2, 'Wt.'],
    [3, 'Śr.'],
    [4, 'Czw.'],
    [5, 'Pt.'],
    [6, 'Sob.'],
  ]);
  
  weekDay = "";

  @Input() dayForecast: DayForecast;
  
  constructor() { }

  ngOnInit(): void {
    this.weekDay = this.weekDaysMap.get(this.dayForecast.date.getDay());
  }
}
