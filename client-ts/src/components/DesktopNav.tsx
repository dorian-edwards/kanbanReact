import { useState } from 'react'
import { useTheme } from './providers/ThemeProvider'
import ThemeToggle from './ThemeToggle'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import hideSidebar from '../assets/icon-hide-sidebar.svg'
import showSidebar from '../assets/icon-show-sidebar.svg'

export default function DesktopNav() {
  const [sidePanel, setSidePanel] = useState<boolean>(true)
  const { isDarkMode, isMobile } = useTheme()

  const toggleSidePanel = () => setSidePanel(!sidePanel)

  return (
    <nav className='desktop-nav flex h-[97px]'>
      <div
        className={`side-panel h-[100vh] bg-white dark:bg-dark-gray border-solid border-r-[1px] border-light-gray dark:border-lines-dark w-full max-w-[300px] relative ${
          sidePanel ? '' : 'w-0 overflow-hidden'
        }`}
      >
        <img
          className='pt-[32.78px] mb-[54px] pl-[34px]'
          src={isDarkMode ? logoLight : logoDark}
          alt='kanban logo'
        />
        <div className='boards-listing'>
          <h3 className='heading-s pl-8 mb-[19px] min-w-[150px]'>
            All Boards &#40;8&#41;
          </h3>
        </div>
        <div className='control-panel absolute bottom-[47px] w-full'>
          <ThemeToggle />
          <button
            className='hide-btn flex items-center gap-x-[15px] pl-[31px] w-[156px]'
            onClick={toggleSidePanel}
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

      {!sidePanel && (
        <div className='logo-wrapper w-[200px] border-solid border-r-[1px] border-b-[1px] border-light-gray dark:border-lines-dark h-[97px] bg-white dark:bg-dark-gray flex items-center px-6'>
          <img src={isDarkMode ? logoLight : logoDark} alt='kanban logo'></img>
        </div>
      )}

      <div className='top-bar text-black dark:text-white bg-white dark:bg-dark-gray w-full h-[97px] border-solid border-b-[1px] border-light-gray dark:border-lines-dark flex items-center px-6'>
        <h1 className='heading-xl'>Platform Launch</h1>
      </div>

      {!sidePanel && (
        <button
          className='absolute bottom-0 bg-main-purple w-14 h-12 rounded-tr-full rounded-br-full pl-[18px] mb-8'
          onClick={toggleSidePanel}
        >
          <img src={showSidebar} alt='' />
        </button>
      )}
    </nav>
  )
}
