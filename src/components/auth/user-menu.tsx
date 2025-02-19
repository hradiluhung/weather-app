import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/context/auth-context'
import { User } from '@supabase/supabase-js'
import { Loader2, LogOut, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserMenu({ user }: { user: User }) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function onLogout() {
    setLoading(true)
    await logout()
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-10 bg-white rounded-full overflow-hidden p-0.5 shadow-md"
          >
            <img
              src="https://avatar.iran.liara.run/public"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <div className="flex items-center gap-2 p-2">
            <div className="size-8 bg-white rounded-full overflow-hidden p-0.5 shadow-md">
              <img
                src="https://avatar.iran.liara.run/public"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{user.email}</h3>
              <p className="text-xs text-gray-500">Free plan</p>
            </div>
          </div>
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile & Saved Locations</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You have to log in again to access your saved locations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={onLogout} disabled={loading} className="flex items-center gap-1">
                {loading && <Loader2 className="animate-spin size-4" />}
                Log out
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
