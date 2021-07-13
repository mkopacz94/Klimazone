import { Component } from '@angular/core';
import { ForecastService } from './forecast/services/forecast.service';
import { GeolocationService } from './forecast/services/geolocation.service';
import { UserLocationService } from './forecast/services/user-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';

  constructor(private geolocationService: GeolocationService,
    private forecastService: ForecastService,
    private locationService: UserLocationService) {}

  ngOnInit() {
  }
}
