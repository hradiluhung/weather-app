import { useAuth } from '@/context/auth-context'
import { useEffect, useState } from 'react'
import LoginFormDialog from '../auth/login-form-dialog'
import SignUpFormDialog from '../auth/signup-form-dialot'
import UserMenu from '../auth/user-menu'
import Logo from './logo'
import NavItems from './nav-items'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center h-16 px-4 md:px-8 lg:px-32">
        <Logo />
        <NavItems />

        {!loading && (
          <div className="flex items-center gap-2">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <LoginFormDialog />
                <SignUpFormDialog />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
