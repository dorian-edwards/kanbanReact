import React, { useContext, createContext, useState, useEffect } from 'react'

export interface ThemeContextInterface {
  isMobile: boolean
  isDarkMode: boolean
  toggleDark: Function
}

const ThemeContext = createContext<ThemeContextInterface | null>(null)

export const useTheme = (): ThemeContextInterface => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('Context required')
  return context
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setMobile] = useState<boolean>(window.innerWidth <= 375)
  const [isDarkMode, setDarkMode] = useState<boolean>(false)

  const toggleDark = () => {
    window.document.querySelector('html')?.classList.toggle('dark')
    setDarkMode(!isDarkMode)
  }

  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (event.matches) {
          setDarkMode(true)
        } else {
          setDarkMode(false)
        }
      })

    window.addEventListener('resize', () => setMobile(window.innerWidth <= 550))
  }, [])

  const value = {
    isMobile,
    isDarkMode,
    toggleDark,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
