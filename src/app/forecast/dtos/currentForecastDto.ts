import { WeatherDto } from "./weatherDto";

export interface CurrentForecastDto {
    dt: number,
    temp: number,
    weather: Array<WeatherDto>
}