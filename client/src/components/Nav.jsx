import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className=''>
      <ul className='flex gap-x-6 justify-center'>
        <li>
          <Link to='/'>Landing</Link>
        </li>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  )
}
