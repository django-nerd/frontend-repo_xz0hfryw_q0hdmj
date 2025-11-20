import React, { useState } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Sidebar open={open} setOpen={setOpen} />
      {children({ onMenu: () => setOpen(true) })}
    </div>
  )
}
