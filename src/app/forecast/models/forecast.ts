import { CurrentForecast } from "./currentForecast";
import { DayForecast } from "./dayForecast";

export interface Forecast {
    current: CurrentForecast,
    daily: Array<DayForecast>
}