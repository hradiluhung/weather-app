import AstroCard from '../astro/astro-card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { motion } from 'framer-motion'

export default function ForecastAstro({ forecastday }: { forecastday: DailyForecast[] }) {
  const astros = forecastday.map((day) => {
    return {
      date: day.date,
      astro: day.astro,
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="font-semibold text-gray-500">Astronomy Forecast</h1>
      <ScrollArea className="mt-2 pb-5 whitespace-nowrap w-full">
        <div className="flex w-max gap-4 py-2">
          {astros.map((astro, index) => (
            <AstroCard key={index} date={astro.date} astro={astro.astro} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </motion.div>
  )
}
