import { LocationStrategy } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../models/location';

@Component({
  selector: 'app-found-location',
  templateUrl: './found-location.component.html',
  styleUrls: ['./found-location.component.css']
})
export class FoundLocationComponent implements OnInit {

  @Input() location: Location;

  locationData = '';

  ngOnInit(): void {
    this.locationData = this.buildLocationData();
  }

  buildLocationData() {
    let locationElements = new Array<string>();

    if(this.location.city) {
      locationElements.push(this.location.city.trim());
    }
    if(this.location.county) {
      locationElements.push(this.location.county.trim());
    }
    if(this.location.country) {
      locationElements.push(this.location.country.trim());
    }

    let locationDataString = '';

    for (let i = 0; i < locationElements.length; i++) {
      if(i < locationElements.length - 1) {
        locationDataString += locationElements[i] + ', ';
      } else {
        locationDataString += locationElements[i];
      }
    }

    return locationDataString;
  }
}
