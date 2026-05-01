import React, { createContext, useContext, useState, useEffect } from 'react'
import * as tokenUtils from '../utils/tokenUtils'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = tokenUtils.getToken()
    const savedUser = tokenUtils.getUser()

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(savedUser)
    }
    setLoading(false)
  }, [])

  const login = (newToken, newUser) => {
    setToken(newToken)
    setUser(newUser)
    tokenUtils.saveToken(newToken)
    tokenUtils.saveUser(newUser)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    tokenUtils.clearAuth()
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
