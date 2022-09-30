import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useTheme } from './providers/ThemeProvider'
import { useAuth } from './providers/AuthProvider'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import hideSidebar from '../assets/icon-hide-sidebar.svg'
import showSidebar from '../assets/icon-show-sidebar.svg'
import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'
import BoardIcon from './BoardIcon'

// const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export interface BoardInterface {
  id: string
  title: string
  userID: string
  columns: [string] | []
}

export default function DesktopNav() {
  const [sidePanel, setSidePanel] = useState<boolean>(true)
  const [boards, setBoards] = useState<BoardInterface[]>([
    { id: '987', title: 'Platform Launch', userID: '1234', columns: [] },
    { id: '988', title: 'Random Side Project', userID: '1234', columns: [] },
    { id: '989', title: 'Portfolio', userID: '1234', columns: [] },
  ])
  const { isDarkMode } = useTheme()
  const { logout } = useAuth()

  const toggleSidePanel = () => setSidePanel(!sidePanel)

  return (
    <div>
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
            All Boards &#40;{boards.length}&#41;
          </h3>
          <ul>
            {boards.map((board, index) => (
              <li key={board.id}>
                <Link
                  to='/'
                  className={`board-listing flex gap-x-4 h-12 w-full max-w-[276px] items-center rounded-tr-full rounded-br-full pl-8 ${
                    index === 0 ? 'text-white bg-main-purple' : 'text-med-gray'
                  }`}
                >
                  <BoardIcon />
                  <p className='heading-m'>{board.title}</p>
                </Link>
              </li>
            ))}
            <li>
              <button
                className={`flex gap-x-4 h-12 w-full max-w-[276px] items-center rounded-tr-full rounded-br-full pl-8 text-main-purple`}
              >
                <BoardIcon />
                <p className='heading-m'>+ Create New Board</p>
              </button>
            </li>
          </ul>
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
