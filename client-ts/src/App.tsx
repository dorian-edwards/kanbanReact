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

import ThemeProvider from './components/providers/ThemeProvider'
import DesktopNav from './components/DesktopNav'

export default function App() {
  return (
    // Center Display
    // <ThemeProvider>
    //   <div className='staging-area bg-[#F2F2F2] dark:bg-v-dark-gray dark:text-white'>
    //     <DesktopNav />
    //   </div>
    // </ThemeProvider>

    // Corner display
    <ThemeProvider>
      <div className='h-full bg-light-gray-bg dark:bg-v-dark-gray'>
        <DesktopNav />
      </div>
    </ThemeProvider>
  )
}
