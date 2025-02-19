import { formatTime } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

/* declare type HourlyForecast = {
    time_epoch: number
    time: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: Condition
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    windchill_c: number
    windchill_f: number
    heatindex_c: number
    heatindex_f: number
    dewpoint_c: number
    dewpoint_f: number
    will_it_rain: number
    chance_of_rain: number
    will_it_snow: number
    chance_of_snow: number
    vis_km: number
    vis_miles: number
    gust_mph: number
    gust_kph: number
    uv: number
  } */

export default function ForecastDialog({ forecast }: { forecast: HourlyForecast }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center py-2 w-36 bg-white hover:shadow-md rounded-xl cursor-pointer hover:-translate-y-1 transform transition-all">
          <span className="text-gray-500 text-sm">{formatTime(forecast.time)}</span>
          <img
            src={forecast.condition.icon}
            alt={forecast.condition.text}
            className="w-12 h-12 mt-4"
          />
          <span className="text-xl mt-2">{forecast.temp_c}&deg;C</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Detail
            <span className="text-gray-500 text-sm ml-2">{formatTime(forecast.time)}</span>
          </DialogTitle>
          <DialogDescription />
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <img
                src={forecast.condition.icon}
                alt={forecast.condition.text}
                className="size-20 mt-4"
              />
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Temperature:</span>
              <span>
                {forecast.temp_c}°C / {forecast.temp_f}°F
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Condition:</span>
              <span>{forecast.condition.text}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Wind:</span>
              <span>
                {forecast.wind_kph} kph / {forecast.wind_mph} mph
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Humidity:</span>
              <span>{forecast.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Precipitation:</span>
              <span>
                {forecast.precip_mm} mm / {forecast.precip_in} in
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Visibility:</span>
              <span>
                {forecast.vis_km} km / {forecast.vis_miles} miles
              </span>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
