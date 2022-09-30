import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './providers/AuthProvider'
import BoardIcon from './BoardIcon'
import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export interface BoardInterface {
  id: string
  title: string
  userID: string
  columns: [string] | []
}

export default function BoardsListing() {
  const { boards } = useAuth()

  return (
    <div className='boards-listing'>
      <h3 className='heading-s pl-8 mb-[19px] min-w-[150px]'>
        All Boards &#40;{boards?.length}&#41;
      </h3>
      <ul>
        {boards?.map((board, index) => (
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
          <Link to='/newboard'>
            <button
              className={`flex gap-x-4 h-12 w-full max-w-[276px] items-center rounded-tr-full rounded-br-full pl-8 text-main-purple`}
            >
              <BoardIcon />
              <p className='heading-m'>+ Create New Board</p>
            </button>
          </Link>
        </li>
      </ul>
    </div>
  )
}
