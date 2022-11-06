import { useAuth } from '../providers/AuthProvider'
import BoardsListing from './BoardsListing'
import ThemeToggle from './ThemeToggle'

export default function BoardDropdown({
  currentBoard,
}: {
  currentBoard: string
}) {
  return (
    <div className='dropdown-wrapper p-4 pl-0 rounded-lg bg-white dark:bg-dark-gray w-full'>
      <BoardsListing />
      <ThemeToggle />
    </div>
  )
}
