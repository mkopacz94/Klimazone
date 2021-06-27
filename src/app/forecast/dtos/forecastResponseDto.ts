import { CurrentForecastDto } from "./currentForecastDto";
import { DailyForecastDto } from "./dailyForecastDto";

export interface ForecastResponseDto {
    current: CurrentForecastDto,
    daily: Array<DailyForecastDto>
}