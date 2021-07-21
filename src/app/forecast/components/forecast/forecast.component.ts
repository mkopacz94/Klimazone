import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { weatherAnimations } from '../../animations/weatherAnimations';
import { CurrentForecast } from '../../models/currentForecast';
import { DayForecast } from '../../models/dayForecast';
import { Geolocation } from '../../models/geolocation';
import { Location } from '../../models/location';
import { ForecastService } from '../../services/forecast.service';
import { GeolocationService } from '../../services/geolocation.service';
import { UserLocationService } from '../../services/user-location.service';

enum ForecastReadStatus {
  None,
  NoLocationFound,
  Loading,
  Error,
  FewLocations,
  SingleLocation
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  animations: weatherAnimations
})
export class ForecastComponent implements OnInit {

  readStatus = ForecastReadStatus.None;
  location = new FormControl('', Validators.required);
  foundLocations = new Array<Location>();

  locationName: string;
  selectedLocation: Location;
  currentForecast: CurrentForecast;
  dailyForecast = new Array<DayForecast>();

  @ViewChild('searchInput') searchElement: ElementRef;

  constructor(private geolocationService: GeolocationService,
    private userLocationService: UserLocationService,
    private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.readCurrentLocationWeather();
  }

  readCurrentLocationWeather() {

    this.readStatus = ForecastReadStatus.Loading;

    this.userLocationService.getUserLocation()
      .subscribe(geolocation => {
        this.loadForecastForLocation(geolocation, "Twoja aktualna lokalizacja");
      }, error => {
        console.log(error);
        this.readStatus = ForecastReadStatus.Error;
      });
  }

  searchLocations() {

    this.unfocusSearchInput()
    this.readStatus = ForecastReadStatus.Loading;

    this.geolocationService.getGeolocation(this.location.value)
      .subscribe(geolocation => {

        if(this.checkIfNoLocationsFound(geolocation)) {
          this.readStatus = ForecastReadStatus.NoLocationFound;
          return;
        }

        if (geolocation.length > 1) {
          this.foundLocations = geolocation;
          this.readStatus = ForecastReadStatus.FewLocations;
          return;
        }
        
        this.loadForecastForLocation(geolocation[0], geolocation[0].city);
      }, error => {
        this.readStatus = ForecastReadStatus.Error;
      });
  }

  unfocusSearchInput() {
    this.searchElement.nativeElement.blur();
  }

  checkIfNoLocationsFound(locations: Array<Location>) : boolean {
    return (locations.length == 1 && locations[0] == undefined)
      || locations.length == 0;
  }

  locationClicked(location: Location) {
    this.loadForecastForLocation(location, location.city);
  }

  loadForecastForLocation(location: Geolocation, locationName: string) {

    this.readStatus = ForecastReadStatus.Loading;

    this.forecastService.getForecast(
      location.latitude, location.longitude
    ).subscribe(forecast => {
      this.locationName = locationName;
      this.currentForecast = forecast.current;
      this.dailyForecast = forecast.daily;
      this.readStatus = ForecastReadStatus.SingleLocation;
    }, error => {
      console.log(error);
      this.readStatus = ForecastReadStatus.Error;
    });
  }

  showLoading(): boolean {
    return this.readStatus == ForecastReadStatus.Loading;
  }

  showNoLocationFound(): boolean {
    return this.readStatus == ForecastReadStatus.NoLocationFound;
  }

  showFewLocations(): boolean {
    return this.readStatus == ForecastReadStatus.FewLocations;
  }

  showSingleLocation(): boolean {
    return this.readStatus == ForecastReadStatus.SingleLocation;
  }
}
