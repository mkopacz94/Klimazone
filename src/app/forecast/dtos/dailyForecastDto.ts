import { TemperatureDto } from "./temperatureDto";
import { WeatherDto } from "./weatherDto";

export interface DailyForecastDto {
    dt: number,
    temp: TemperatureDto,
    weather: Array<WeatherDto>
}