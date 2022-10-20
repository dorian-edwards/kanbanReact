// core imports
import { Link } from 'react-router-dom'

// import contexts
import { useTheme } from '../providers/ThemeProvider'

// import components
import BoardsListing from './BoardsListing'
import ThemeToggle from './ThemeToggle'

// import images
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import HideToggle from './HideToggle'

export default function SidePanel({ toggle }: { toggle: () => void }) {
  const { isDarkMode } = useTheme()

  return (
    <nav className='side-panel w-[40vw] flex flex-col pb-8'>
      <Link to='/' className='pl-[34px]'>
        <img
          className='pt-[32.78px] mb-[54px] max-w-[132px] pr-3'
          src={isDarkMode ? logoLight : logoDark}
          alt='kanban logo'
        />
      </Link>
      <div className='flex flex-col justify-between flex-grow'>
        <BoardsListing />
        <div className='control-panel w-full'>
          <ThemeToggle />
          <button
            className='hide-btn flex items-center gap-x-[15px] pl-[31px] w-full max-w-[276px] h-12 rounded-r-full hover:bg-main-purple-opaque dark:hover:bg-white group'
            onClick={toggle}
          >
            <HideToggle />
            <span className='heading-m text-med-gray group-hover:text-main-purple'>
              Hide Sidebar
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
