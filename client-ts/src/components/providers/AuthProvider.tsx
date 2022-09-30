/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useContext,
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export interface User {
  id: string
  username: string
  email: string
}

export interface AuthContextInterface {
  login: (data: User) => void
  logout: () => void
  user: User | null
  boards: Board[] | [] | null
}

export interface Board {
  id: string
  title: string
  userID: string
  columns: [string] | []
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [boards, setBoards] = useState<Board[] | null>(null)
  const navigate = useNavigate()

  const login = async (data: User) => {
    setUser(data)
    navigate('/home') // <-- replace: true is not an option here
  }

  const logout = async () => {
    await axios.delete(`${baseUrl}/auth/logout`, { withCredentials: true })
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`${baseUrl}/auth/user`, {
        withCredentials: true,
      })
      if (data) return setUser(data)
    }
    getUser()
  }, [])

  useEffect(() => {
    const getBoards = async () => {
      const { data } = await axios.get(`${baseUrl}/board`, {
        withCredentials: true,
      })
      if (data) return setBoards(data)
    }

    getBoards()
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      boards,
    }),
    [user, boards]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('Context needed')
  return context
}
