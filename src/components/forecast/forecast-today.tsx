import { formatDateTime } from '@/lib/utils'
import ForecastDialog from './forecast-dialog'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { motion } from 'framer-motion'

export default function ForecastToday({ forecast }: { forecast: Forecast }) {
  const todayForecast = forecast.forecastday.filter(
    (day) => day.date === forecast.forecastday[0].date
  )[0]

  const hourlyForecast = todayForecast.hour

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-semibold text-gray-500">
        Today Forecast (
        {formatDateTime(todayForecast.date, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
        )
      </h1>
      <ScrollArea className="mt-2 pb-5 whitespace-nowrap w-full">
        <div className="flex w-max gap-4 py-2">
          {hourlyForecast.map((forecast, index) => (
            <ForecastDialog forecast={forecast} key={index} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  )
}
