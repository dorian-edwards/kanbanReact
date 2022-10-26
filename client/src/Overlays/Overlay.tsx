import React, { ReactNode } from 'react'

export interface OverlayProps {
  open: boolean
  children?: ReactNode
  blur?: boolean
  close?: () => void
}

export default function Overlay({ open, children, blur, close }: OverlayProps) {
  const toggleScreen = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLElement
    if (!id) return
    if (id === 'overlay' && close) return close()
  }
  return (
    <div
      onClick={(e) => toggleScreen(e)}
      id='overlay'
      className={`overlay-wrapper h-full w-full fixed top-0 left-0 bg-overlay flex items-center justify-center z-50 px-4${
        blur ? 'overlay-blur' : ''
      } ${!open ? 'hidden' : ''}`}
    >
      {children}
    </div>
  )
}
