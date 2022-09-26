import { useAuth } from '../components/providers/AuthProvider'

export default function Home() {
  const { logout, user } = useAuth()

  console.log('home page: ', user)
  console.log(logout)

  return (
    <div>
      <div>This is a secure page that can only be seen when logged in!</div>
      <div>Welcome {user?.username}</div>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}
