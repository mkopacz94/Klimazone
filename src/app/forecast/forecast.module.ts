import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from './components/forecast/forecast.component';

@NgModule({
  declarations: [
    ForecastComponent
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
