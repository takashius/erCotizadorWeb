import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  user: any
  login: (userData: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)

  const login = (userData: any) => {
    setUser(userData)
    localStorage.setItem('Token', userData.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('Token')

  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
