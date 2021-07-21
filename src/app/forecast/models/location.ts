import { Geolocation } from "./geolocation";

export class Location implements Geolocation {
    city: string;
    country: string;
    county: string;
    latitude: number;
    longitude: number;
}