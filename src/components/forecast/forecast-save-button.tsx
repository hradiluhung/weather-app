import { useAuth } from '@/context/auth-context'
import { useToast } from '@/hooks/use-toast'
import { deleteLocation, isLocationSaved, saveLocation } from '@/lib/action/saved-location.action'
import { Loader2, StarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoginFormDialog from '../auth/login-form-dialog'
import { Button } from '../ui/button'
import { ToastAction } from '../ui/toast'

export default function ForecastSaveButton({
  name,
  lat,
  long,
  onToggleSaveSuccess,
}: {
  name: string
  lat: number
  long: number
  onToggleSaveSuccess?: () => void
}) {
  const { toast } = useToast()
  const { user } = useAuth()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkIsLocationSaved() {
      if (user) {
        const saved = await isLocationSaved(lat.toString(), long.toString())
        setIsSaved(saved)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    checkIsLocationSaved()
  }, [user, lat, long])

  async function onToggleSaveLocation() {
    if (!user) {
      toast({
        title: 'Please login to save location',
        action: (
          <ToastAction altText="Login" onClick={() => setDialogOpen(true)}>
            Login
          </ToastAction>
        ),
        variant: 'destructive',
      })

      return
    }

    try {
      setLoading(true)

      if (isSaved) {
        await deleteLocation(lat.toString(), long.toString())
      } else {
        await saveLocation(user.id, name, lat.toString(), long.toString())
      }

      setIsSaved(!isSaved)
      onToggleSaveSuccess?.()

      toast({
        title: `Location ${isSaved ? 'deleted' : 'saved'} successfully`,
      })
    } catch (error: any) {
      toast({
        title: 'Failed to save location',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        className="flex items-center gap-1 text-blue-500 text-xs bg-blue-500/10 hover:bg-blue-500/15 transition-colors"
        onClick={onToggleSaveLocation}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="animate-spin size-4" />
        ) : isSaved ? (
          <StarIcon className="size-4" fill="hsl(207 90% 54%)" />
        ) : (
          <StarIcon className="size-4" />
        )}
        {loading ? 'Loading' : isSaved ? 'Delete' : 'Save'}
      </Button>

      <LoginFormDialog defaultOpen={dialogOpen} setDefaultOpen={setDialogOpen} />
    </>
  )
}
