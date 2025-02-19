import { useToast } from '@/hooks/use-toast'
import { supabaseClient } from '@/lib/supabase/supabase-client'
import { User } from '@supabase/supabase-js'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: { email: string; password: string }) => Promise<void>
  signUp: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getSession() {
      const { data } = await supabaseClient.auth.getSession()

      if (data.session) {
        setUser(data.session?.user)
      }

      setLoading(false)
    }

    getSession()
  }, [])

  async function login(credentials: { email: string; password: string }) {
    const { data, error } = await supabaseClient.auth.signInWithPassword(credentials)

    if (error) {
      toast({
        title: 'Error signing in',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      setUser(data?.user)
      navigate(0)
    }
  }

  async function logout() {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      navigate(0)
      setUser(null)
    }
  }

  async function signUp(credentials: { email: string; password: string }) {
    const { data, error } = await supabaseClient.auth.signUp(credentials)

    if (error) {
      console.log(JSON.stringify(error, null, 2))

      toast({
        title: 'Error signing up',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      setUser(data?.user)
      navigate(0)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
