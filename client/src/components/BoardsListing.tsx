import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Overlay from '../Overlays/Overlay'
import { useAuth } from '../providers/AuthProvider'
import BoardIcon from './BoardIcon'
import NewBoardForm from './NewBoardForm'

export default function BoardsListing() {
  const { boards } = useAuth()
  const [fullscreenOpen, setFullscreenOpen] = useState<boolean>(false)

  return (
    <>
      <Overlay open={fullscreenOpen} close={() => setFullscreenOpen(false)}>
        <NewBoardForm close={() => setFullscreenOpen(false)} />
      </Overlay>
      <div className='boards-listing'>
        <h3 className='heading-s pl-8 mb-[19px] min-w-[150px]'>
          All Boards &#40;{boards?.length}&#41;
        </h3>
        <ul>
          {boards?.map((board, index) => (
            <li key={board._id}>
              <NavLink
                to={`/home/${board._id}`}
                className={({ isActive }) =>
                  `board-listing ${
                    isActive
                      ? 'text-white bg-main-purple'
                      : 'inactive-board group'
                  }`
                }
              >
                <BoardIcon />
                <p className='heading-m group-hover:text-main-purple'>
                  {board.title}
                </p>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => setFullscreenOpen(true)}
              className={`flex gap-x-4 h-12 w-full max-w-[276px] items-center rounded-tr-full rounded-br-full pl-8 text-main-purple`}
            >
              <BoardIcon />
              <p className='heading-m'>+ Create New Board</p>
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
