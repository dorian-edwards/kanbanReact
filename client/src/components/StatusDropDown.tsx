import { useState } from 'react'
import chevronDown from '../assets/icon-chevron-down.svg'
import chevronUp from '../assets/icon-chevron-up.svg'
import {
  BoardInterface,
  ColumnInterface,
  TaskInterface,
} from '../Interfaces/ObjectInterfaces'

export interface StatusDropDownProps {
  currentBoard: BoardInterface
  selectedColumn?: ColumnInterface
  currentTask?: TaskInterface
}

export default function StatusDropDown({
  currentBoard,
  selectedColumn,
}: StatusDropDownProps) {
  const [isActive, setIsActive] = useState<boolean>(false)

  const handleColumnSelect = (column: ColumnInterface): void => {
    toggleActive()
  }

  const toggleActive = () => setIsActive(!isActive)

  return (
    <div className={`status-dropdown mb-6`}>
      <div
        className={`status-dropdown-wrapper ${
          isActive ? 'border-solid border-[1px] border-input-idle rounded' : ''
        }`}
      >
        <div
          className={`flex justify-between items-center input px-4 rounded ${
            isActive ? 'border-none' : ''
          }`}
        >
          <p className='body-l text-black dark:text-white'>
            {selectedColumn?.title}
          </p>
          <button type='button' onClick={toggleActive}>
            <img
              src={isActive ? chevronUp : chevronDown}
              alt='downward chevron'
            />
          </button>
        </div>
        {isActive && (
          <ul className='px-4 w-[260px]bg-white dark:bg-dark-gray rounded-br-md'>
            {currentBoard?.columns
              .filter((column) => column._id !== selectedColumn?._id)
              .map((column) => (
                <li
                  key={column._id}
                  className='dark:text-white body-l py-[8.5px]'
                >
                  <button
                    type='button'
                    onClick={() => handleColumnSelect(column)}
                  >
                    {column.title}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}
