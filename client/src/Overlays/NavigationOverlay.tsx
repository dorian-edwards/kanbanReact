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
import NavigationBoiler from '../components/NavigationBoiler'

export default function NavigationOverlay({
  children,
}: {
  children: JSX.Element
}) {
  // import themes
  const { isMobile, isDarkMode } = useTheme()

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

  // Next steps
  // 1) build generic nav bar for when user is not logged in

  return (
    <>
      <header>
        {!user ? (
          <NavigationBoiler />
        ) : (
          <>
            {isMobile ? (
              <MobileNav currentBoard={currentBoard} />
            ) : (
              <DesktopNavFull currentBoard={currentBoard} />
            )}
          </>
        )}
      </header>
      <main className='bg-light-gray-bg dark:bg-v-dark-gray h-full tablet:h-[calc(100vh-97px)] overflow-x-scroll'>
        {children}
      </main>
    </>
  )
}

/**
 * Scenario 2: user present
 * ext - user present no side panel => mobile : desktop
 * ext - user present w/side panel => mobile : desktop
 */
