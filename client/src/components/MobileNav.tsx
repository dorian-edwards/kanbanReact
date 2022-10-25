import { Link } from 'react-router-dom'
import BoardDropdown from './BoardDropdown'
import logoMobile from '../assets/logo-mobile.svg'
import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'
import Button from './Button'
import { BoardInterface } from '../Interfaces/ObjectInterfaces'
import { useState } from 'react'
import EditPanel from './EditPanel'

export default function Nav({
  currentBoard,
}: {
  currentBoard: BoardInterface | undefined
}) {
  const [editPanelOpen, setEditPanelOpen] = useState<boolean>(false)
  return (
    <>
      <nav className='flex items-center justify-between px-4 w-full bg-white dark:bg-dark-gray h-16'>
        <div className='flex items-center'>
          <Link to='/'>
            <img className='mr-4' src={logoMobile} alt='kanban mobile logo' />
          </Link>
          <BoardDropdown currentBoard={currentBoard?.title || ''} />
        </div>
        <div className='flex items-center'>
          <Button
            styling='add-task-mobile'
            text={'+'}
            disabled={!currentBoard}
            onClick={(e) => console.log(e)}
          />
          <button onClick={() => setEditPanelOpen(!editPanelOpen)}>
            <img src={verticalEllipses} alt='vertical ellipses' />
          </button>
        </div>
      </nav>
      {editPanelOpen ? (
        <EditPanel
          target='board'
          id={currentBoard?._id || ''}
          close={() => setEditPanelOpen(false)}
          currentBoard={currentBoard}
        />
      ) : (
        ''
      )}
    </>
  )
}
