import { useState } from 'react'
import { useTheme } from './providers/ThemeProvider'
import ThemeToggle from './ThemeToggle'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import hideSidebar from '../assets/icon-hide-sidebar.svg'

export default function DesktopNav() {
  const [sidePanel, setSidePanel] = useState<boolean>(true)
  const { isDarkMode, isMobile } = useTheme()

  return (
    <nav className='desktop-nav flex'>
      <div className='side-panel h-[100vh] bg-white dark:bg-dark-gray border-solid border-r-[1px] border-light-gray dark:border-lines-dark w-full max-w-[300px] relative'>
        <img
          className='pt-[32.78px] mb-[54px] pl-[34px]'
          src={isDarkMode ? logoLight : logoDark}
          alt='kanban logo'
        />
        <div className='boards-listing'>
          <h3 className='heading-s pl-8 mb-[19px]'>All Boards &#40;8&#41;</h3>
        </div>
        <div className='control-panel absolute bottom-[47px] w-full'>
          <ThemeToggle />
          <button className='hide-btn flex gap-x-[15px] pl-[31px]'>
            <img src={hideSidebar} alt='hide sidebar toggle' />
            <span className='heading-m text-med-gray'>Hide Sidebar</span>
          </button>
        </div>
      </div>
      <div className='top-bar text-black dark:text-white bg-white dark:bg-dark-gray w-full h-[97px] border-solid border-b-[1px] border-light-gray dark:border-lines-dark flex items-center px-6'>
        <h1 className='heading-xl'>Platform Launch</h1>
      </div>
      <img src='' alt='' />
    </nav>
  )
}
