import { useTheme } from './ThemeProvider'
import BoardDropdown from './BoardDropdown'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import logoMobile from '../assets/logo-mobile.svg'

export default function Nav() {
  const { isMobile, isDarkMode } = useTheme()

  return (
    <nav className='flex items-center px-4 w-full bg-white dark:bg-dark-gray h-16'>
      {isMobile ? (
        <img className='mr-4' src={logoMobile} alt='kanban mobile logo' />
      ) : (
        <img
          className='mr-4'
          src={isDarkMode ? logoLight : logoDark}
          alt='kanban logo'
        />
      )}
      <BoardDropdown />
    </nav>
  )
}
