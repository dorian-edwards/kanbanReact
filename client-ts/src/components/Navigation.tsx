import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import DesktopNav from './DesktopNav'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import { useTheme } from './providers/ThemeProvider'
import { useAuth } from './providers/AuthProvider'

export default function Navigation() {
  const { isMobile, isDarkMode } = useTheme()
  const { user } = useAuth()

  return (
    <>
      {user ? (
        <>{isMobile ? <MobileNav /> : <DesktopNav />}</>
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
