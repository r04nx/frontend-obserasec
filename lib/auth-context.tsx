"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  organization: string
  role: 'admin' | 'analyst' | 'viewer'
  sector: 'BFSI' | 'Defence' | 'IT' | 'Government'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

interface RegisterData {
  email: string
  password: string
  name: string
  organization: string
  sector: User['sector']
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for the platform
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@observasec.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@observasec.com',
      name: 'Arjun Sharma',
      organization: 'ObseraSEC',
      role: 'admin',
      sector: 'IT'
    }
  },
  'analyst@icici.com': {
    password: 'analyst123',
    user: {
      id: '2',
      email: 'analyst@icici.com',
      name: 'Priya Patel',
      organization: 'ICICI Bank',
      role: 'analyst',
      sector: 'BFSI'
    }
  },
  'security@drdo.gov.in': {
    password: 'defence123',
    user: {
      id: '3',
      email: 'security@drdo.gov.in',
      name: 'Vikram Singh',
      organization: 'DRDO',
      role: 'analyst',
      sector: 'Defence'
    }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const stored = localStorage.getItem('obseraone_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('obseraone_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const demoUser = DEMO_USERS[email.toLowerCase()]
    
    if (demoUser && demoUser.password === password) {
      setUser(demoUser.user)
      localStorage.setItem('obseraone_user', JSON.stringify(demoUser.user))
      setIsLoading(false)
      return { success: true }
    }
    
    // Check localStorage for registered users
    const registeredUsers = JSON.parse(localStorage.getItem('obseraone_registered_users') || '{}')
    const registeredUser = registeredUsers[email.toLowerCase()]
    
    if (registeredUser && registeredUser.password === password) {
      setUser(registeredUser.user)
      localStorage.setItem('obseraone_user', JSON.stringify(registeredUser.user))
      setIsLoading(false)
      return { success: true }
    }
    
    setIsLoading(false)
    return { success: false, error: 'Invalid credentials. Try demo: admin@observasec.com / admin123' }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const registeredUsers = JSON.parse(localStorage.getItem('obseraone_registered_users') || '{}')
    
    if (registeredUsers[data.email.toLowerCase()] || DEMO_USERS[data.email.toLowerCase()]) {
      setIsLoading(false)
      return { success: false, error: 'Email already registered' }
    }
    
    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      name: data.name,
      organization: data.organization,
      role: 'analyst',
      sector: data.sector
    }
    
    registeredUsers[data.email.toLowerCase()] = {
      password: data.password,
      user: newUser
    }
    
    localStorage.setItem('obseraone_registered_users', JSON.stringify(registeredUsers))
    setUser(newUser)
    localStorage.setItem('obseraone_user', JSON.stringify(newUser))
    setIsLoading(false)
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('obseraone_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
