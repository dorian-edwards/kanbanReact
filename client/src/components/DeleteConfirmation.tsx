import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from './Button'
import { useAuth } from '../providers/AuthProvider'
import { useTheme } from '../providers/ThemeProvider'

const baseUrl = process.env.REACT_APP_BASE_URL_DEV

export interface DeleteConfirmationProps {
  type: string
  id: string | undefined
  title: string | undefined
  close: () => void
  closeEditPanel: () => void
}

export default function DeleteConfirmation({
  type,
  id,
  title,
  close,
  closeEditPanel,
}: DeleteConfirmationProps) {
  const { updateBoards } = useAuth()
  const { isMobile } = useTheme()
  const navigate = useNavigate()

  const cancel = () => {
    close()
    closeEditPanel()
  }

  const deleteBoard = async () => {
    await axios.delete(`${baseUrl}/board/${id}`, { withCredentials: true })
    if (id) updateBoards(id)
    cancel()
    return navigate('/home')
  }

  return (
    <div className='confirmation-window bg-white w-full max-w-[480px] p-8 rounded-md'>
      <h2 className='heading-l text-red mb-6'>{`Delete this ${type}?`}</h2>
      <p className='body-l text-med-gray mb-6'>{`Are you sure you want to delete the ‘${title}’ board? This action will remove all columns and tasks and cannot be reversed.`}</p>
      <div className={`flex ${isMobile ? 'flex-col gap-y-4' : 'gap-x-3'}`}>
        <Button
          text='Delete'
          styling='destructive'
          disabled={false}
          onClick={deleteBoard}
        />
        <Button
          text='Cancel'
          onClick={cancel}
          styling='secondary'
          disabled={false}
        />
      </div>
    </div>
  )
}
