import { ReactNode } from 'react'

export interface OverlayProps {
  open: boolean
  children?: ReactNode
  blur?: boolean
}

export default function Overlay({ open, children, blur }: OverlayProps) {
  return (
    <div
      className={`overlay-wrapper h-full w-full fixed top-0 left-0 bg-overlay flex items-center justify-center z-50 px-4${
        blur ? 'overlay-blur' : ''
      } ${!open ? 'hidden' : ''}`}
    >
      {children}
    </div>
  )
}
