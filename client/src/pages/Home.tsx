import { Link, useParams, Outlet, Navigate } from 'react-router-dom'

// import contexts
import { useAuth } from '../providers/AuthProvider'

// import components
import Button from '../components/Button'
import Overlay from '../Overlays/Overlay'
import NewBoardForm from '../components/NewBoardForm'
import { useState } from 'react'

export default function Home() {
  const { boards } = useAuth()
  const { boardId } = useParams()

  const [fullscreenOpen, setFullscreenOpen] = useState<boolean>(false)

  return (
    <>
      {!boardId ? (
        boards.length === 0 ? (
          <>
            <Overlay open={fullscreenOpen}>
              <NewBoardForm close={() => setFullscreenOpen(false)} />
            </Overlay>
            <div className='flex items-center justify-center min-h-[calc(100vh-97px)] w-full'>
              <div>
                <p className='heading-l text-med-gray mb-8'>
                  Create a board to get started
                </p>
                <Button
                  styling='btn primary-s'
                  text='+ Create Board'
                  disabled={false}
                  onClick={() => setFullscreenOpen(true)}
                />
              </div>
            </div>
          </>
        ) : (
          <Navigate to={`/home/${boards[0]._id}`} />
        )
      ) : (
        <Outlet />
      )}
    </>
  )
}
