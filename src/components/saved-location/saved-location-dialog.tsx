import { WEATHER_API_KEY, WEATHER_BASE_URL } from '@/lib/constants/constants'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import ForecastOverview from '../forecast/forecast-overview'
import ForecastTabs from '../forecast/forecast-tabs'
import { useNavigate } from 'react-router-dom'

export default function SavedLocationDialog({ location }: { location: SavedLocation }) {
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [temperatureType, setTemperatureType] = useState<'C' | 'F'>('C')
  const navigate = useNavigate()

  function toggleTemperatureType(type: 'C' | 'F') {
    setTemperatureType(type)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${WEATHER_BASE_URL}/current.json?q=${location.lat},${location.long}&key=${WEATHER_API_KEY}`
        )
        const data = await response.json()
        setWeatherData(data)
      } catch (error: any) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [location.lat, location.long])

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-xl cursor-pointer transform transition-all">
        <Skeleton className="h-6 w-1/2 mb-4" />
        <div className="flex gap-4 items-center mt-2">
          <Skeleton className="w-10 h-10" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
        </div>
      </div>
    )
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="p-4 bg-white hover:shadow-md rounded-xl cursor-pointer hover:-translate-y-1 transform transition-all">
            <h1>{location.name}</h1>
            <div className="flex gap-4 items-center mt-2">
              <div className="flex items-center gap-2">
                <img
                  src={weatherData?.current.condition.icon}
                  alt="condition icon"
                  className="w-10"
                />
                <h1 className="text-2xl">
                  {temperatureType === 'C'
                    ? weatherData?.current.temp_c
                    : weatherData?.current.temp_f}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <p
                  className={`cursor-pointer ${
                    temperatureType === 'C' ? 'font-semibold' : 'text-gray-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleTemperatureType('C')
                  }}
                >
                  °C
                </p>
                <p
                  className={`cursor-pointer ${
                    temperatureType === 'F' ? 'font-semibold' : 'text-gray-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    return toggleTemperatureType('F')
                  }}
                >
                  °F
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="min-w-full md:min-w-[calc(100%-120px)] max-h-[calc(100vh-80px)] overflow-y-auto bg-blue-50">
          <DialogHeader>
            <DialogTitle>Forecast Detail</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="w-full overflow-x-hidden flex flex-col gap-8">
            <ForecastOverview
              weatherData={weatherData}
              temperatureType={temperatureType}
              toggleTemperatureType={toggleTemperatureType}
              onToggleSaveSuccess={()=>navigate(0)}
            />
            <ForecastTabs
              latLong={{
                lat: parseInt(location.lat, 10),
                long: parseInt(location.long, 10),
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}
