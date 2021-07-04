import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from './components/forecast/forecast.component';
import { DayForecastComponent } from './components/day-forecast/day-forecast.component';

@NgModule({
  declarations: [
    ForecastComponent,
    DayForecastComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ForecastComponent
  ]
})
export class ForecastModule { }
