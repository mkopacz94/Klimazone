import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Geolocation } from '../models/geolocation';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor() { }

  getUserLocation() : Observable<Geolocation> {
    return new Observable(obs => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success => {
          let geolocation: Geolocation = {
            latitude: success.coords.latitude,
            longitude: success.coords.longitude
          };
          
          obs.next(geolocation);
          obs.complete();
        }, error => {
          obs.error(error);
        })
      } else {
        obs.error('No geolocation provider.');
      }
    });
  }
}
