import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ForecastResponseDto } from '../dtos/forecastResponseDto';
import { CurrentForecast } from '../models/currentForecast';
import { DayForecast } from '../models/dayForecast';
import { Forecast } from '../models/forecast';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private baseUrl = environment.openweatherapiUrl;

  constructor(private http: HttpClient) { }

  getForecast(latitude: number, longitude: number) {
    const params = new HttpParams()
      .set('lat', latitude)
      .set('lon', longitude)
      .set('exclude', 'minutely,hourly,alerts')
      .set('units', 'metric')
      .set('lang', 'pl')
      .set('appid', environment.openweatherapiKey);

    return this.http.get<ForecastResponseDto>(this.baseUrl, { params })
      .pipe(
        map((response) => {
          let currentForecast: CurrentForecast = {
            
            date: new Date(response.current.dt * 1000),
            temperature: response.current.temp,
            description: response.current.weather[0].description,
            icon: response.current.weather[0].icon
          };

          let dailyForecast = Array<DayForecast>();

          response.daily.forEach(day => {
            dailyForecast.push({
              date: new Date(day.dt * 1000),
              dayTemperature: day.temp.day,
              nightTemperature: day.temp.night,
              description: day.weather[0].description,
              icon: day.weather[0].icon
            });
          });

          let forecast: Forecast = {
            current: currentForecast,
            daily: dailyForecast
          };

          return forecast;
        })
      );
  }
}
