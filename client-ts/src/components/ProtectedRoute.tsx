import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element
}): JSX.Element {
  const { user } = useAuth()
  if (!user) return <Navigate to='/login' replace={true} />
  return children
}
