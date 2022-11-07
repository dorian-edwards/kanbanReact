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
import {
  AuthContextInterface,
  BoardInterface,
  User,
} from '../Interfaces/ObjectInterfaces'

const baseUrl = '/'

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [boards, setBoards] = useState<BoardInterface[] | []>([])
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

  const updateBoards = (board: BoardInterface | string) => {
    if (typeof board === 'string') {
      return setBoards(boards.filter((el) => el._id !== board))
    }
    const currentBoard = boards.find((el) => board._id === el._id)
    if (!currentBoard) {
      setBoards([...boards, board])
    } else {
      const newBoards = boards.map((el) => (el._id === board._id ? board : el))
      setBoards(newBoards)
    }
    navigate(`/home/${board._id}`)
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
    if (!user) return
    const getBoards = async () => {
      const { data } = await axios.get(`${baseUrl}/board`, {
        withCredentials: true,
      })
      if (data) return setBoards(data)
    }

    getBoards()
  }, [user])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      boards,
      updateBoards,
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
