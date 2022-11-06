import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import chevronDown from '../assets/icon-chevron-down.svg'
import chevronUp from '../assets/icon-chevron-up.svg'
import BoardsListing from './BoardsListing'
import ThemeToggle from './ThemeToggle'

export default function BoardDropdown({
  currentBoard,
}: {
  currentBoard: string
}) {
  // const [isActive, setIsActive] = useState<boolean>(false)
  const { boards } = useAuth()

  // const toggleActive = () => setIsActive(!isActive)

  // useEffect(() => {
  //   setIsActive(false)
  // }, [currentBoard])

  // return (
  //   <div className='dropdown-wrapper'>
  //     <div className='logo-wrapper-full border-none pl-0 flex gap-x-2'>
  //       <h2 className='heading-l text-black dark:text-white'>{currentBoard}</h2>
  //       <button onClick={toggleActive}>
  //         <img
  //           src={isActive ? chevronUp : chevronDown}
  //           alt='downward chevron'
  //         />
  //       </button>
  //     </div>
  //     {isActive && (
  //       <ul className='absolute pl-[57px] w-[260px] top-14 left-0 bg-white dark:bg-dark-gray rounded-br-md'>
  //         {boards.map((board) => (
  //           <li key={board._id} className='mb-3 dark:text-white'>
  //             <NavLink to={`/home/${board._id}`} className='heading-l'>
  //               {board.title}
  //             </NavLink>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // )

  return (
    <div className='dropdown-wrapper p-4 pl-0 rounded-lg bg-white dark:bg-dark-gray w-full'>
      <BoardsListing />
      <ThemeToggle />
    </div>
  )
}
