/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, createContext, useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = async (data) => {
    setUser(data)
    navigate('/home') // <-- replace: true is not an option here, why ?
  }

  const logout = async () => {
    await axios.delete(`${baseUrl}/logout`, { withCredentials: true })
    setUser(null)
    navigate('/')
  }

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`${baseUrl}/user`, {
        withCredentials: true,
      })
      if (data) return setUser(data)
    }
    getUser()
  }, [])

  // const value = useMemo(
  //   () => ({
  //     user,
  //     login,
  //     logout,
  //   }),
  //   [user]
  // )

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
