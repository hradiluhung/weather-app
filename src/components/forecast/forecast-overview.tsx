import { formatDateTime } from '@/lib/utils'
import ForecastSaveButton from './forecast-save-button'

interface HomeOverviewProps {
  weatherData: WeatherData | null
  temperatureType: 'C' | 'F'
  toggleTemperatureType: (type: 'C' | 'F') => void
  customLocationName?: string
  onToggleSaveSuccess?: ()=> void
}

export default function ForecastOverview({
  weatherData,
  temperatureType,
  toggleTemperatureType,
  customLocationName,
  onToggleSaveSuccess,
}: HomeOverviewProps) {
  return (
    <div className="flex justify-between gap-8">
      <div>
        <div className="flex items-center gap-4">
          <div>
            <span className="font-semibold">
              {customLocationName
                ? customLocationName
                : `${weatherData?.location.name}, ${weatherData?.location.region}, ${weatherData?.location.country}`}
            </span>
            <span className="ms-4 text-gray-500">
              {weatherData?.location.localtime &&
                formatDateTime(weatherData?.location.localtime, {
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
            </span>
          </div>
          {weatherData?.location && (
            <ForecastSaveButton
              name={
                customLocationName
                  ? customLocationName
                  : `${weatherData?.location.name}, ${weatherData?.location.region}, ${weatherData?.location.country}`
              }
              lat={weatherData?.location.lat}
              long={weatherData?.location.lon}
              onToggleSaveSuccess={onToggleSaveSuccess}
            />
          )}
        </div>
        <div className="mt-8 flex gap-4 items-start">
          <div className="flex items-center gap-2">
            <div className="text-center">
              <img
                src={weatherData?.current.condition.icon}
                alt="condition icon"
                className="w-24"
              />
              <p className="text-gray-500 text-xs">{weatherData?.current.condition.text}</p>
            </div>
            <h1 className="text-7xl">
              {temperatureType === 'C' ? weatherData?.current.temp_c : weatherData?.current.temp_f}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <p
              className={`text-lg cursor-pointer ${
                temperatureType === 'C' ? 'font-semibold' : 'text-gray-500'
              }`}
              onClick={() => toggleTemperatureType('C')}
            >
              °C
            </p>
            <p
              className={`text-lg cursor-pointer ${
                temperatureType === 'F' ? 'font-semibold' : 'text-gray-500'
              }`}
              onClick={() => toggleTemperatureType('F')}
            >
              °F
            </p>
          </div>
        </div>
      </div>
      <div className="text-gray-500 text-right">
        <p>Wind: {weatherData?.current.wind_kph} km/h</p>
        <p>Wind Degree: {weatherData?.current.wind_degree} °</p>
        <p>Pressure: {weatherData?.current.pressure_mb} mb</p>
        <p>Visibility: {weatherData?.current.vis_km} km</p>
        <p>UV Index: {weatherData?.current.uv}</p>
      </div>
    </div>
  )
}
