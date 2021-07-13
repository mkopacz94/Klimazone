import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { CurrentForecast } from '../../models/currentForecast';
import { DayForecast } from '../../models/dayForecast';
import { Location } from '../../models/location';
import { ForecastService } from '../../services/forecast.service';
import { GeolocationService } from '../../services/geolocation.service';
import { UserLocationService } from '../../services/user-location.service';

enum ForecastReadStatus {
    None,
    Loading,
    Error,
    FewLocations,
    SingleLocation
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  readStatus = ForecastReadStatus.None;
  location = new FormControl('');
  foundLocations = new Array<Location>();
  
  selectedLocation: Location;
  currentForecast: CurrentForecast;
  dailyForecast = new Array<DayForecast>();

  constructor(private geolocationService: GeolocationService,
    private userLocationService: UserLocationService,
    private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.getMyLocation();
  } 

  getMyLocation() {

    this.readStatus = ForecastReadStatus.Loading;

    this.userLocationService.getUserLocation()
      .subscribe(geolocation => {
        this.setLocation({
          city: "Twoja aktualna lokalizacja",
          county: "",
          country: "",
          longitude: 0,
          latitude :0
        });
        this.getForecast(geolocation.latitude, geolocation.longitude);
      }, error => {
        this.readStatus = ForecastReadStatus.Error;
      });
  }

  searchLocations() {

    if(!this.location.value)
      return;

    this.readStatus = ForecastReadStatus.Loading;

    this.geolocationService.getGeolocation(this.location.value)
      .subscribe(geolocation => {
        this.foundLocations = geolocation;
        if(this.foundLocations.length > 1) {
          this.readStatus = ForecastReadStatus.FewLocations;
        }
        else {
          this.setLocation(this.foundLocations[0]);
          this.getForecast(
            this.foundLocations[0].latitude,
            this.foundLocations[0].longitude);
        }
      }, error => {
        this.readStatus = ForecastReadStatus.Error;
      });
  }

  locationClicked(location: Location) {
    this.setLocation(location);
    this.getForecast(location.latitude, location.longitude);
  }

  getForecast(latitude: number, longitude: number) {

    this.readStatus = ForecastReadStatus.Loading;

    this.forecastService.getForecast(
      latitude, longitude
    ).subscribe(forecast => {
      this.currentForecast = forecast.current;
      this.dailyForecast = forecast.daily;
      this.readStatus = ForecastReadStatus.SingleLocation;
    });
  }

  setLocation(location: Location) {
    this.selectedLocation = location;
  }

  showLoading() : boolean {
    return this.readStatus == ForecastReadStatus.Loading;
  }

  showFewLocations() : boolean {
    return this.readStatus == ForecastReadStatus.FewLocations;
  }

  showSingleLocation() : boolean {
    return this.readStatus == ForecastReadStatus.SingleLocation;
  }
}
