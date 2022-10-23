// import core
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

// import contexts
import { useAuth } from '../providers/AuthProvider'
import { useTheme } from '../providers/ThemeProvider'

// importinterfaces
import { BoardInterface } from '../Interfaces/ObjectInterfaces'

// import components
import DesktopNavFull from '../components/DesktopNavFull'
import MobileNav from '../components/MobileNav'
import SidePanel from '../components/SidePanel'
import LoggedOut from '../pages/LoggedOut'
import ShowSidePanel from '../components/ShowSidePanel'

export default function NavigationOverlay({
  children,
}: {
  children: JSX.Element
}) {
  const [sidePanel, setSidePanel] = useState<boolean>(true)
  // import themes
  const { isMobile } = useTheme()

  // Get board id if applicable
  const id = useLocation().pathname.split('/home/')[1]

  // import auth context for users
  const { user, boards } = useAuth()
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | undefined>(
    undefined
  )

  // check if there is a board id in the url and if so set currentBoard
  useEffect(() => {
    if (id) {
      const board = boards.find((board) => board._id === id)
      if (board) {
        setCurrentBoard(board)
      }
    }
  }, [id, boards])

  const toggleSidePanel = () => setSidePanel(!sidePanel)
  const updateBoard = (board: BoardInterface): void => setCurrentBoard(board)

  return (
    <>
      {!user ? (
        <LoggedOut>{children}</LoggedOut>
      ) : (
        <>
          {isMobile ? (
            <>
              <MobileNav currentBoard={currentBoard} />
              <main className='stage flex'>{children}</main>
            </>
          ) : (
            <div className='stage flex'>
              {sidePanel ? (
                <>
                  <SidePanel toggle={toggleSidePanel} />
                  <div className='w-[79%] overflow-x-hidden flex-grow'>
                    <DesktopNavFull
                      currentBoard={currentBoard}
                      sidePanel={sidePanel}
                    />
                    <main className='overflow-x-scroll h-full'>{children}</main>
                  </div>
                </>
              ) : (
                <>
                  <div className='w-[79%] overflow-x-hidden flex-grow'>
                    <DesktopNavFull
                      currentBoard={currentBoard}
                      sidePanel={false}
                    />
                    <main className='overflow-x-scroll h-full'>
                      {children}
                      <ShowSidePanel toggle={toggleSidePanel} />
                    </main>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}
