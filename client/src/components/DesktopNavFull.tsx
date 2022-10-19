// core imports
import { useState } from 'react'

// import contexts
import { useTheme } from '../providers/ThemeProvider'
import { useAuth } from '../providers/AuthProvider'

// import interfaces
import { BoardInterface } from '../Interfaces/ObjectInterfaces'

// import components
import Button from './Button'
import NewTaskForm from './NewTaskForm'
import Overlay from '../Overlays/Overlay'

// import images
import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'

export default function DesktopNavFull({
  currentBoard,
}: {
  currentBoard: BoardInterface | undefined
}) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const { isDarkMode } = useTheme()
  const { logout } = useAuth()

  return (
    <>
      <nav className='desktop-nav flex h-[97px]'>
        <div className='top-bar flex'>
          <div className='logo-wrapper-full h-full'>
            <img
              src={isDarkMode ? logoLight : logoDark}
              alt='kanban logo'
              className='pb-[5px]'
            />
          </div>
          <div className='flex w-full pl-8 justify-between items-center'>
            <h1 className='heading-xl'>{currentBoard?.title || ''}</h1>
            <div className='flex items-center gap-x-6'>
              <Button
                styling='btn primary-l w-[164px] heading-m'
                text='+ Add New Task'
                disabled={false}
                onClick={() => setFullscreenOpen(true)}
              />
              <button onClick={logout}>
                <img src={verticalEllipses} alt='vertical ellipsis' />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Overlay open={fullscreenOpen}>
        <NewTaskForm
          currentBoard={currentBoard}
          close={() => setFullscreenOpen(false)}
        />
      </Overlay>
    </>
  )
}
