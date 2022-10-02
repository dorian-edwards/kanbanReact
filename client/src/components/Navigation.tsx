import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import { useTheme } from './providers/ThemeProvider'
import { useAuth } from './providers/AuthProvider'
import logoDark from '../assets/logo-dark.svg'
import logoLight from '../assets/logo-light.svg'

export default function Navigation() {
  const { isMobile, isDarkMode } = useTheme()
  const [currentBoard, setCurrentBoard] = useState<string>('')
  const { user, boards } = useAuth()

  const id = useLocation().pathname.split('/home/')[1]

  useEffect(() => {
    if (id) {
      const board = boards.find((board) => board._id === id)
      if (board) {
        setCurrentBoard(board.title)
      }
    }
  }, [id, boards])

  return (
    <>
      {user ? (
        <>
          {isMobile ? (
            <MobileNav currentBoard={currentBoard} />
          ) : (
            <DesktopNav currentBoard={currentBoard} />
          )}
        </>
      ) : (
        <nav className='flex items-center justify-between px-4 w-full bg-white dark:bg-dark-gray h-16 absolute top-0'>
          <Link to='/'>
            <img
              className='mr-4'
              src={isDarkMode ? logoLight : logoDark}
              alt='kanban mobile logo'
            />
          </Link>
        </nav>
      )}
    </>
  )
}
