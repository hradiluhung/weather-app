import ForecastOverview from '@/components/forecast/forecast-overview'
import ForecastTabs from '@/components/forecast/forecast-tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { WEATHER_API_KEY, WEATHER_BASE_URL } from '@/lib/constants/constants'
import { useEffect, useState } from 'react'
import { useGeolocated } from 'react-geolocated'

export default function HomePage() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [temperatureType, setTemperatureType] = useState<'C' | 'F'>('C')
  const [error, setError] = useState<string | null>(null)

  const { coords, positionError } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        if (coords) {
          const { latitude, longitude } = coords
          const response = await fetch(
            `${WEATHER_BASE_URL}/current.json?q=${latitude},${longitude}&key=${WEATHER_API_KEY}`
          )
          const data = await response.json()
          setData(data)
          setLoading(false)
        }
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [coords, positionError])

  if (error) {
    return <div>{error}</div>
  }

  function toggleTemperatureType(type: 'C' | 'F') {
    setTemperatureType(type)
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-64 rounded-2xl" />
        <Skeleton className="w-full h-40 rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-16">
      <h1 className="text-2xl font-bold">Your Location</h1>

      {/* SECTION 1 */}
      <ForecastOverview
        weatherData={data}
        temperatureType={temperatureType}
        toggleTemperatureType={toggleTemperatureType}
      />

      {/* SECTION 2 */}
      {coords && (
        <ForecastTabs
          latLong={{
            lat: coords?.latitude,
            long: coords?.longitude,
          }}
        />
      )}
    </div>
  )
}
