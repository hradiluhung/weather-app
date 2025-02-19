import search from '@/assets/search.png'
import ForecastOverview from '@/components/forecast/forecast-overview'
import ForecastTabs from '@/components/forecast/forecast-tabs'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  WEATHER_API_KEY,
  WEATHER_BASE_URL,
  GEO_API_KEY,
  GEO_BASE_URL,
} from '@/lib/constants/constants'
import { Loader2, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function SearchPage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<GeoLocation[] | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isUserInput, setIsUserInput] = useState(false)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)

  const [loadingWeather, setLoadingWeather] = useState(true)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [temperatureType, setTemperatureType] = useState<'C' | 'F'>('C')

  useEffect(() => {
    if (!searchKeyword || !isUserInput) {
      setSearchResults(null)
      setSearchComplete(false)
      return
    }

    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      setLoadingLocation(true)
      try {
        const response = await fetch(
          `${GEO_BASE_URL}?q=${searchKeyword}&key=${GEO_API_KEY}&pretty=1`,
          { signal }
        )
        if (!response.ok) throw new Error('Gagal mengambil data')
        const data = await response.json()

        setSearchResults(data.results)
        setIsDropdownOpen(true)
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching data:', error)
        }
      } finally {
        setLoadingLocation(false)
        setSearchComplete(true)
      }
    }

    const debounceTimeout = setTimeout(fetchData, 1000)

    return () => {
      clearTimeout(debounceTimeout)
      controller.abort()
    }
  }, [searchKeyword, isUserInput])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelectLocation = (location: GeoLocation) => {
    setSelectedLocation(location)
    setSearchKeyword(location.formatted)
    setIsDropdownOpen(false)
    setIsUserInput(false)
    setSearchComplete(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
    setIsUserInput(true)
    setSearchComplete(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedLocation) {
          setLoadingWeather(true)
          const response = await fetch(
            `${WEATHER_BASE_URL}/current.json?q=${selectedLocation.geometry.lat},${selectedLocation.geometry.lng}&key=${WEATHER_API_KEY}`
          )
          const data = await response.json()
          setWeatherData(data)
          setLoadingWeather(false)
        }
      } catch (error: any) {
        console.error(error.message)
        setLoadingWeather(false)
      }
    }
    fetchData()
  }, [selectedLocation])

  function toggleTemperatureType(type: 'C' | 'F') {
    setTemperatureType(type)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-6">
        <div className="relative w-full md:w-[400px]" ref={dropdownRef}>
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500"
            size={18}
          />
          <Input
            placeholder="Search location..."
            className="pl-10 bg-white h-14 rounded-2xl"
            value={searchKeyword}
            onChange={handleInputChange}
            onFocus={() => setIsDropdownOpen(true)}
          />

          {loadingLocation && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 animate-spin" />
          )}

          {isDropdownOpen && searchResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectLocation(result)}
                >
                  {result.formatted}
                </div>
              ))}
            </div>
          )}

          {isDropdownOpen && searchKeyword && searchComplete && searchResults === null && (
            <div className="absolute text-gray-500 z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto p-2">
              No locations found
            </div>
          )}
        </div>
      </div>

      {selectedLocation ? (
        <div className="pt-8">
          {loadingWeather ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="w-full h-64 rounded-2xl" />
              <Skeleton className="w-full h-40 rounded-2xl" />
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-16">
              {/* SECTION 1 */}
              <ForecastOverview
                weatherData={weatherData}
                temperatureType={temperatureType}
                toggleTemperatureType={toggleTemperatureType}
                customLocationName={selectedLocation.formatted}
              />

              {/* SECTION 2 */}
              {selectedLocation && (
                <ForecastTabs
                  latLong={{
                    lat: selectedLocation?.geometry.lat,
                    long: selectedLocation?.geometry.lng,
                  }}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <img src={search} alt="search image" className="w-36" />
          <h1 className="text-gray-500">Search for a location to get weather information</h1>
        </div>
      )}
    </div>
  )
}
