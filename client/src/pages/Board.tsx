// Core imports
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// import contexts
import { useAuth } from '../providers/AuthProvider'

// import interfaces
import { BoardInterface, ColumnInterface } from '../Interfaces/ObjectInterfaces'

// import componentes
import Button from '../components/Button'
import Column from '../components/Column'
import Overlay from '../Overlays/Overlay'
import NewColumnForm from '../components/NewColumnForm'
import NewColumnButton from '../components/NewColumnButton'

export default function Board() {
  const { boards } = useAuth()
  const { boardId } = useParams()

  const [fullscreenOpen, setFullscreenOpen] = useState<boolean>(false)
  const [columns, setColumns] = useState<ColumnInterface[] | []>([])
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | undefined>(
    undefined
  )

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
    if (board) {
      setColumns(board.columns)
      return setCurrentBoard(board)
    }
  }, [boardId, boards])

  const updateColumns = (column: ColumnInterface): void => {
    return setColumns([...columns, column])
  }

  return (
    <>
      <Overlay open={fullscreenOpen}>
        <NewColumnForm
          board={boardId}
          close={() => setFullscreenOpen(false)}
          updateColumns={updateColumns}
        />
      </Overlay>
      {columns.length === 0 ? (
        <div className='flex items-center justify-center flex-col h-[calc(100vh-97px)]'>
          <h2 className='heading-l text-med-gray mb-8'>
            This board is empty. Create a new column to get started
          </h2>
          <Button
            text='+ Add New Column'
            styling='primary-s max-w-[174px]'
            disabled={false}
            onClick={() => setFullscreenOpen(true)}
          />
        </div>
      ) : (
        <div className='board flex gap-x-6 p-6 w-[100vw] bg-light-gray-bg dark:bg-v-dark-gray h-full'>
          {currentBoard &&
            columns.map((column) => {
              incrementIconColor()
              return (
                <Column
                  key={column._id}
                  column={column}
                  color={colorMap[color]}
                />
              )
            })}
          <NewColumnButton onClick={() => setFullscreenOpen(true)} />
        </div>
      )}
    </>
  )
}
