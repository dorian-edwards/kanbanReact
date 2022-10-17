import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../components/providers/AuthProvider'
import Column from '../components/Column'

import { BoardInterface } from '../components/Interfaces/ObjectInterfaces'
import NewBoardButton from '../components/NewBoardButton'

export default function Board() {
  const { boards } = useAuth()
  const { boardId } = useParams()
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | undefined>(
    undefined
  )

  //cycles through colors for column icons
  const colorMap = ['bg-teal', 'bg-main-purple', 'bg-aqua-green']
  let color = 2
  const incrementIconColor = (): void => {
    if (color === 2) {
      color = 0
      return
    }
    color++
  }

  useEffect(() => {
    const board = boards.find((board: BoardInterface) => board._id === boardId)
    if (board) return setCurrentBoard(board)
  }, [boardId, boards])

  return (
    <div className='board flex gap-x-6 p-6 w-[100vw] bg-light-gray-bg'>
      {currentBoard &&
        currentBoard.columns.map((column) => {
          incrementIconColor()
          return (
            <Column key={column._id} column={column} color={colorMap[color]} />
          )
        })}
      <NewBoardButton />
    </div>
  )
}
