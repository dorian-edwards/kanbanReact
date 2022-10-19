// core imports
import { Link } from 'react-router-dom'

// import contexts
import { useTheme } from '../providers/ThemeProvider'

// import components
import BoardsListing from './BoardsListing'
import ThemeToggle from './ThemeToggle'

// import images
import hideSidebar from '../assets/icon-hide-sidebar.svg'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'

export default function SidePanel() {
  const { isDarkMode } = useTheme()

  return (
    <div className='side-panel w-[40vw]'>
      <Link to='/'>
        <img
          className='pt-[32.78px] mb-[54px] pl-[34px] pr-3'
          src={isDarkMode ? logoLight : logoDark}
          alt='kanban logo'
        />
      </Link>
      <BoardsListing />
      <div className='control-panel absolute bottom-[47px] w-full'>
        <ThemeToggle />
        <button
          className='hide-btn flex items-center gap-x-[15px] pl-[31px] w-full min-w-[150px]'
          onClick={() => {}}
        >
          <img
            src={hideSidebar}
            alt='hide sidebar toggle'
            className='w-auto h-auto'
          />
          <span className='heading-m text-med-gray'>Hide Sidebar</span>
        </button>
      </div>
    </div>
  )
}
