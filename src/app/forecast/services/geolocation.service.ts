import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeoApiResponseDto } from '../dtos/geoApiResponseDto';
import { map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { PropertiesDto } from '../dtos/propertiesDto';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private baseUrl = environment.geoapiUrl;

  constructor(private http: HttpClient) { }

  getGeolocation(city: string): Observable<Array<Location>> {
    const params = new HttpParams()
      .set('text', city)
      .set('apiKey', environment.geoapiKey);

    return this.http.get<GeoApiResponseDto>(this.baseUrl, { params })
      .pipe(
        map((response) => {
          let geolocationArray: Array<Location> = Array<Location>();

          response.features.forEach(feature => {
            if (geolocationArray.find(l => l.city == feature.properties.city)
              == undefined) {
              geolocationArray.push(
                {
                  city: feature.properties.city,
                  country: feature.properties.country,
                  latitude: feature.properties.lat,
                  longitude: feature.properties.lon
                }
              );
            }
          });

          return geolocationArray;
        })
      );
  }
}
