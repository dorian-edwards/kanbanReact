import { Link } from 'react-router-dom'
import { useTheme } from '../providers/ThemeProvider'

// iamges
import logoDark from '../assets/logo-dark.svg'
import logoLight from '../assets/logo-light.svg'

export default function NavigationBoiler() {
  const { isDarkMode } = useTheme()

  return (
    <nav className='flex items-center justify-between px-4 w-full bg-white dark:bg-dark-gray h-16 absolute top-0'>
      <Link to='/'>
        <img
          className='mr-4'
          src={isDarkMode ? logoLight : logoDark}
          alt='kanban mobile logo'
        />
      </Link>
    </nav>
  )
}
