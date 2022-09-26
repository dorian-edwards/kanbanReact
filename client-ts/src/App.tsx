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

import NewBoardForm from './components/NewBoardForm'
import ThemeProvider from './components/providers/ThemeProvider'

export default function App() {
  return (
    // Center Display
    // <div className='staging-area'>
    //   Component to build here
    // </div>

    // Corner display
    <ThemeProvider>
      <div className='h-full bg-[#F2F2F2] dark:bg-v-dark-gray'>
        <NewBoardForm />
      </div>
    </ThemeProvider>
  )
}
