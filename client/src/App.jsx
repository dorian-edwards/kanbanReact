/*
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './components/AuthProvider'


export default function App() {
  return (
    <AuthProvider>
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
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </AuthProvider>
  )
}
*/

import Input from './components/Input'
import Button from './components/Button'

export default function App() {
  return (
    <div className='staging-area bg-white dark:bg-v-dark-gray'>
      <Input />
      <Button styling='primary-l' text='test' />
    </div>
  )
}
