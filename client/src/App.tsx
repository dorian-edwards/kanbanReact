import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from './providers/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import Board from './pages/Board'

import NavigationOverlay from './Overlays/NavigationOverlay'

export default function App() {
  return (
    <AuthProvider>
      <NavigationOverlay>
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
          >
            {' '}
            <Route
              path=':boardId'
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </NavigationOverlay>
    </AuthProvider>
  )
}
