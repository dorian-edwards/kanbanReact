import { Link, useParams, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import Button from '../components/Button'

export default function Home() {
  const { boards } = useAuth()
  const { boardId } = useParams()

  return (
    <>
      {!boardId ? (
        boards.length === 0 ? (
          <div className='flex items-center justify-center h-full w-full'>
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
        ) : (
          <Navigate to={`/home/${boards[0]._id}`} />
        )
      ) : (
        <Outlet />
      )}
    </>
  )
}
