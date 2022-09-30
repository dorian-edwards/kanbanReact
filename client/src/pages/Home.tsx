import { Link } from 'react-router-dom'
import { useAuth } from '../components/providers/AuthProvider'
import Button from '../components/Button'

export default function Home() {
  const { logout, user, boards } = useAuth()

  return (
    <div className='flex items-center justify-center h-full'>
      <div>
        <p className='heading-l text-med-gray mb-8'>
          Create a board to get started
        </p>
        <Link to='/newboard'>
          <Button
            styling='btn primary-s'
            text='+ Create Board'
            disabled={false}
          />
        </Link>
      </div>
    </div>
  )
}
