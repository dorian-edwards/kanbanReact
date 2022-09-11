import { useAuth } from '../components/AuthProvider'

export default function Home() {
  const { logout, user } = useAuth()

  return (
    <div>
      <div>This is a secure page that can only be seen when logged in!</div>
      <div>Welcome {user.username}</div>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}
