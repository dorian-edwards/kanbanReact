import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../components/providers/AuthProvider'
import chevronDown from '../assets/icon-chevron-down.svg'
import chevronUp from '../assets/icon-chevron-up.svg'

// Built for styling, will integrate column objects later when connecting to backend.

export default function BoardDropdown({
  currentBoard,
}: {
  currentBoard: string
}) {
  const [isActive, setActive] = useState<boolean>(false)
  const { boards } = useAuth()

  const toggleActive = () => setActive(!isActive)

  useEffect(() => {
    setActive(false)
  }, [currentBoard])

  return (
    <div className='dropdown-wrapper'>
      <div className='logo-wrapper flex gap-x-2'>
        <h2 className='heading-l text-black dark:text-white'>{currentBoard}</h2>
        <button onClick={toggleActive}>
          <img
            src={isActive ? chevronUp : chevronDown}
            alt='downward chevron'
          />
        </button>
      </div>
      {isActive && (
        <ul className='absolute pl-[57px] w-[260px] top-14 left-0 bg-white dark:bg-dark-gray rounded-br-md'>
          {boards.map((board) => (
            <li key={board._id} className='mb-3 dark:text-white'>
              <NavLink to={`/home/${board._id}`} className='heading-l'>
                {board.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
