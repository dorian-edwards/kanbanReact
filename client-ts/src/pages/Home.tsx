import { useAuth } from '../components/providers/AuthProvider'

export default function Home() {
  const { logout, user } = useAuth()

  return <div>Hello {user?.username}</div>
}
