import { WEATHER_API_KEY, WEATHER_BASE_URL } from '@/lib/constants/constants'
import { toTitleCase } from '@/lib/utils'
import { useEffect, useState } from 'react'
import ForecastDetailNotFound from './forecast-detail-not-found'
import ForecastToday from './forecast-today'
import Credit from '../common/credit'
import ForecastFuture from './forecast-future'
import ForecastAstro from './forecast-astro'
import { Skeleton } from '../ui/skeleton'

const tabItems = ['today', 'future', 'astronomy']

export default function ForecastTabs({ latLong }: { latLong: LatLong }) {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(tabItems[0])
  const [forecast, setForecast] = useState<Forecast | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${WEATHER_BASE_URL}/forecast.json?q=${latLong.lat},${latLong.long}&days=7&key=${WEATHER_API_KEY}`
        )
        const data = await response.json()
        setForecast(data.forecast)
      } catch (error: any) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [latLong.lat, latLong.long])

  return (
    <div>
      <div className="flex gap-4 border-b border-b-blue-200">
        {tabItems.map((item) => (
          <button
            key={item}
            className={`py-2 px-4 cursor-pointer ${
              item === activeTab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(item)}
          >
            {toTitleCase(item)}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="mt-4">
          {activeTab === 'today' && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
          {activeTab === 'future' && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}
          {activeTab === 'astronomy' && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4">
          {!forecast ? (
            <ForecastDetailNotFound name={activeTab} />
          ) : (
            <>
              {activeTab === 'today' && <ForecastToday forecast={forecast} />}
              {activeTab === 'future' && <ForecastFuture forecastday={forecast.forecastday} />}
              {activeTab === 'astronomy' && <ForecastAstro forecastday={forecast.forecastday} />}
            </>
          )}

          <Credit />
        </div>
      )}
    </div>
  )
}
