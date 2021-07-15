import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from './components/forecast/forecast.component';
import { DayForecastComponent } from './components/day-forecast/day-forecast.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FoundLocationComponent } from './components/found-location/found-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UppercaseFirstPipe } from '../pipes/UppercaseFirstPipe';

@NgModule({
  declarations: [
    ForecastComponent,
    DayForecastComponent,
    FoundLocationComponent,
    UppercaseFirstPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    ForecastComponent
  ]
})
export class ForecastModule { }
