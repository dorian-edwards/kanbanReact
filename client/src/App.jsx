import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute user={null}>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  )
}
