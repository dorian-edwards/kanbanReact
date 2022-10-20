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
  sidePanel,
}: {
  currentBoard: BoardInterface | undefined
  sidePanel?: boolean
}) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const { isDarkMode } = useTheme()
  const { logout } = useAuth()

  return (
    <>
      <nav className='desktop-nav flex h-[97px] sticky top-0 z-40 w-[100%]'>
        <div className='top-bar flex'>
          {!sidePanel && (
            <div className='logo-wrapper-full h-full'>
              <img
                src={isDarkMode ? logoLight : logoDark}
                alt='kanban logo'
                className='pb-[5px]'
              />
            </div>
          )}

          <div className='flex w-full pl-8 justify-between items-center'>
            <h1 className='heading-xl'>{currentBoard?.title || ''}</h1>
            <div className='flex items-center gap-x-6'>
              <Button
                styling='btn primary-l w-[164px] heading-m'
                text='+ Add New Task'
                disabled={!currentBoard}
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
