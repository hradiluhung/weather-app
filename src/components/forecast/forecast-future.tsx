import { formatDateTime } from '@/lib/utils'
import { useState } from 'react'
import ForecastDialog from './forecast-dialog'
import { Button } from '../ui/button'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { motion } from 'framer-motion'

export default function ForecastFuture({ forecastday }: { forecastday: DailyForecast[] }) {
  const futureForecast = forecastday.filter((day) => day.date !== forecastday[0].date)

  const dates = futureForecast.map((f) => f.date)
  const [activeDate, setActiveDate] = useState<string>(dates[0])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Tab untuk daftar tanggal */}
      <div className="flex gap-4">
        {dates.map((date) => (
          <Button
            key={date}
            onClick={() => setActiveDate(date)}
            variant={date === activeDate ? 'default' : 'secondary'}
            className={`${
              date !== activeDate && 'bg-white hover:bg-blue-500/10 transition-colors'
            }`}
          >
            {formatDateTime(date, {
              month: 'short',
              day: 'numeric',
              weekday: 'short',
            })}
          </Button>
        ))}
      </div>

      {/* Konten forecast untuk tanggal aktif */}
      <div className="mt-4">
        <h1 className="font-semibold text-gray-500">
          {formatDateTime(activeDate, {
            month: 'short',
            day: 'numeric',
            weekday: 'short',
          })}{' '}
          Forecast
        </h1>
        <ScrollArea className="mt-2 pb-5 whitespace-nowrap w-full">
          <div className="flex w-max gap-4 py-2">
            {futureForecast
              .filter((f) => f.date === activeDate)[0]
              .hour.map((forecast, index) => (
                <ForecastDialog forecast={forecast} key={index} />
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </motion.div>
  )
}
