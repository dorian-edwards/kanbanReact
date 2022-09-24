import React, { useState } from 'react'
import chevronDown from '../assets/icon-chevron-down.svg'
import chevronUp from '../assets/icon-chevron-up.svg'

// Built for styling, will integrate column objects later when connecting to backend.

export default function BoardDropdown() {
  const [isActive, setActive] = useState<boolean>(false)
  const [board, setBoard] = useState<string>('Platform Launch')

  const boards = [
    { title: 'ToDo App', id: 123 },
    { title: 'Kanban', id: 456 },
    { title: 'Catan API', id: 789 },
  ]

  const toggleActive = () => setActive(!isActive)
  const selectBoard = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement
    setBoard(button.value)
    setActive(false)
  }

  return (
    <div className='dropdown-wrapper'>
      <h2 className='heading-l text-black dark:text-white'>
        {board}{' '}
        <button onClick={toggleActive}>
          <img
            src={isActive ? chevronUp : chevronDown}
            alt='downward chevron'
          />
        </button>
      </h2>
      {isActive && (
        <ul className='absolute pl-[57px] w-[260px] top-14 left-0 bg-white rounded-br-md'>
          {boards.map((board) => (
            <li key={board.id} className='mb-3'>
              <button
                className='heading-l'
                onClick={selectBoard}
                value={board.title}
              >
                {board.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
