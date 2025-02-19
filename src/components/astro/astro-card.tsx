import moon1 from '@/assets/moon_1.png'
import moon2 from '@/assets/moon_2.png'
import moon3 from '@/assets/moon_3.png'
import moon4 from '@/assets/moon_4.png'
import moon5 from '@/assets/moon_5.png'
import moon6 from '@/assets/moon_6.png'
import moon7 from '@/assets/moon_7.png'
import moon8 from '@/assets/moon_8.png'
import moon9 from '@/assets/moon_9.png'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { formatDateTime } from '@/lib/utils'
import { ArrowDown, ArrowUp, Sunrise, Sunset } from 'lucide-react'

interface AstroCardProps {
  date: string
  astro: Astro
}

function getMoonImage(illumination: number) {
  if (illumination <= 10) return moon1
  if (illumination <= 20) return moon2
  if (illumination <= 30) return moon3
  if (illumination <= 40) return moon4
  if (illumination <= 60) return moon5
  if (illumination <= 70) return moon6
  if (illumination <= 80) return moon7
  if (illumination <= 90) return moon8
  return moon9 // 91% - 100% (Full Moon)
}

export default function AstroCard({ date, astro }: AstroCardProps) {
  const moonImg = getMoonImage(astro.moon_illumination)

  return (
    <TooltipProvider>
      <div className={`max-w-md mx-auto rounded-lg p-6 transition-colors duration-500 bg-white`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {formatDateTime(date, {
              month: 'short',
              day: 'numeric',
              weekday: 'short',
            })}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2 flex flex-col">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Sunrise className="w-5 h-5" />
                  <p>{astro.sunrise}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Sunrise</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Sunset className="w-5 h-5" />
                  <p>{astro.sunset}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Sunset</TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-2 flex flex-col">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <ArrowUp className="w-5 h-5" />
                  <p>{astro.moonrise}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Moonrise</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <ArrowDown className="w-5 h-5" />
                  <p>{astro.moonset}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Moonset</TooltipContent>
            </Tooltip>
          </div>

          <div className="col-span-2 flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-24 h-24">
                  <img
                    src={moonImg || '/placeholder.svg'}
                    alt={astro.moon_phase}
                    className="transition-transform duration-300 hover:scale-110 object-contain"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>{astro.moon_phase} Moon</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-300"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-blue-600"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray={`${astro.moon_illumination * 2.51327} 251.327`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold">{astro.moon_illumination}%</span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>Moon Illumination</TooltipContent>
            </Tooltip>
          </div>

          <div className="col-span-2 flex justify-between">
            <p>
              <span className="font-medium">Moon:</span>{' '}
              {astro.is_moon_up ? 'Visible' : 'Not visible'}
            </p>
            <p>
              <span className="font-medium">Sun:</span> {astro.is_sun_up ? 'Up' : 'Down'}
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
