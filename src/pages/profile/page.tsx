import SavedLocationDialog from '@/components/saved-location/saved-location-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/auth-context'
import { getSavedLocations } from '@/lib/action/saved-location.action'
import { formatDateTime } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [savedLocations, setSavedLocations] = useState<SavedLocation[] | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (!user && !loading) {
      navigate('/')
    }

    async function fetchSavedLocations() {
      const savedLocations = await getSavedLocations()
      setSavedLocations(savedLocations)
      setLoadingData(false)
    }

    fetchSavedLocations()
  }, [loading, navigate, user])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="flex flex-col items-center py-16 gap-8">
        <div className="size-36 bg-white rounded-full overflow-hidden p-0.5 shadow-md">
          <img
            src="https://avatar.iran.liara.run/public"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{user?.email}</h2>
          <p className="text-gray-500">Free plan</p>
        </div>

        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-primary px-4 h-10 border border-blue-500/50 rounded-2xl bg-blue-500/10">
            <StarIcon className="size-4" fill="hsl(207 90% 54%)" />
            {savedLocations?.length} location(s) saved
          </div>
        </div>
      </div>
      <div className="md:col-span-2 flex flex-col items-center md:items-start">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Your Saved Location(s)</h1>
          <span className="ms-2 text-gray-500">
            {formatDateTime(new Date().toString(), {
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8 w-full">
          {loadingData ? (
            <>
              {Array.from({ length: 4 }).map((_, index) => (
                <GridCardSkeleton key={index} />
              ))}
            </>
          ) : savedLocations && savedLocations.length > 0 ? (
            savedLocations.map((loc, index) => <SavedLocationDialog key={index} location={loc} />)
          ) : (
            <div className='text-gray-500'>No location found</div>
          )}
        </div>
      </div>
    </div>
  )
}

function GridCardSkeleton() {
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
}
