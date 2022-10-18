import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTheme } from '../providers/ThemeProvider'

// interfaces
import { BoardInterface } from '../Interfaces/ObjectInterfaces'
import { useAuth } from '../providers/AuthProvider'

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
        <div>Navigation</div>
      </header>
      <main className='bg-light-gray-bg dark:bg-v-dark-gray h-full tablet:h-[calc(100vh-97px)] overflow-x-scroll'>
        {children}
      </main>
    </>
  )
}
