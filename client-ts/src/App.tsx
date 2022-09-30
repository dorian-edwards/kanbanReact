import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import { AuthProvider } from './components/providers/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import NewBoard from './pages/NewBoard'

export default function App() {
  return (
    <AuthProvider>
      <header>
        <Navigation />
      </header>
      <main className='bg-light-gray dark:bg-v-dark-gray h-full tablet:h-[calc(100vh-97px)]'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/newboard'
            element={
              <ProtectedRoute>
                <NewBoard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  )
}
