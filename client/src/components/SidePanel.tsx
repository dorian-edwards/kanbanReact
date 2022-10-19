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

export default function SidePanel() {
  const { isDarkMode } = useTheme()

  return (
    <nav className='side-panel w-[40vw] flex flex-col pb-8'>
      <Link to='/'>
        <img
          className='pt-[32.78px] mb-[54px] pl-[34px] pr-3'
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
            onClick={() => {}}
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

export function HideToggle() {
  return (
    <svg width='18' height='16' xmlns='http://www.w3.org/2000/svg'>
      <path
        className='group-hover:fill-main-purple'
        d='M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z'
        fill='#828FA3'
      />
    </svg>
  )
}
