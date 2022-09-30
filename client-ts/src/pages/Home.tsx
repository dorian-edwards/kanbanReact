import { useAuth } from '../components/providers/AuthProvider'

export default function Home() {
  const { logout, user, boards } = useAuth()

  return (
    <div className='flex items-center justify-center h-full'>
      Hello {user?.username}
    </div>
  )
}
