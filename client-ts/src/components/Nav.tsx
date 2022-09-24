import { useTheme } from './ThemeProvider'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import logoMobile from '../assets/logo-mobile.svg'

export default function Nav() {
  const { isMobile, isDarkMode } = useTheme()

  return (
    <nav className='w-full'>
      {isMobile ? (
        <img src={logoMobile} alt='kanban mobile logo' />
      ) : (
        <img src={isDarkMode ? logoLight : logoDark} alt='kanban logo' />
      )}
    </nav>
  )
}
