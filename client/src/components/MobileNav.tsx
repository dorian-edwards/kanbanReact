import { Link } from 'react-router-dom'
import BoardDropdown from './BoardDropdown'
import logoMobile from '../assets/logo-mobile.svg'
import verticalEllipses from '../assets/icon-vertical-ellipsis.svg'
import Button from './Button'

export default function Nav({ currentBoard }: { currentBoard: string }) {
  return (
    <nav className='flex items-center justify-between px-4 w-full bg-white dark:bg-dark-gray h-16'>
      <div className='flex items-center'>
        <Link to='/'>
          <img className='mr-4' src={logoMobile} alt='kanban mobile logo' />
        </Link>
        <BoardDropdown currentBoard={currentBoard} />
      </div>
      <div className='flex items-center'>
        <Button
          styling='add-task-mobile'
          text={'+'}
          disabled={false}
          onClick={(e) => console.log(e)}
        />
        {/* Not sure what this button will do yet*/}
        <button>
          <img src={verticalEllipses} alt='vertical ellipses' />
        </button>
      </div>
    </nav>
  )
}
