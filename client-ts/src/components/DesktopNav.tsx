import { useState } from 'react'
import { useTheme } from './providers/ThemeProvider'
import { useAuth } from './providers/AuthProvider'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import hideSidebar from '../assets/icon-hide-sidebar.svg'
import showSidebar from '../assets/icon-show-sidebar.svg'
import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'

export default function DesktopNav() {
  const [sidePanel, setSidePanel] = useState<boolean>(true)
  const { isDarkMode } = useTheme()
  const { logout } = useAuth()

  const toggleSidePanel = () => setSidePanel(!sidePanel)

  return (
    <div className=''>
      <div
        className={`side-panel ${
          sidePanel ? 'w-[40vw]' : 'w-0 overflow-hidden'
        }`}
      >
        <img
          className='pt-[32.78px] mb-[54px] pl-[34px] pr-3'
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
            className='hide-btn flex items-center gap-x-[15px] pl-[31px] w-full min-w-[150px]'
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
      <nav className='desktop-nav flex h-[97px]'>
        {!sidePanel && (
          <div className='logo-wrapper h-full'>
            <img src={isDarkMode ? logoLight : logoDark} alt='kanban logo' />
          </div>
        )}

        <div className='top-bar flex justify-between items-center'>
          <h1 className='heading-xl'>Platform Launch</h1>
          <div className='flex items-center gap-x-6'>
            <Button
              styling='btn primary-l w-[164px] heading-m'
              text='+Add New Task'
              disabled={false}
            />
            <button onClick={logout}>
              <img src={verticalEllipses} alt='vertical ellipsis' />
            </button>
          </div>
        </div>

        {!sidePanel && (
          <button
            className='absolute bottom-0 left-0 bg-main-purple w-14 h-12 rounded-tr-full rounded-br-full pl-[18px] mb-8'
            onClick={toggleSidePanel}
          >
            <img src={showSidebar} alt='open eye icon' />
          </button>
        )}
      </nav>
    </div>
  )
}
