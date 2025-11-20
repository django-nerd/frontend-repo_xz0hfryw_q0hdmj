import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Home, GitBranch, Map, Users, BookText, Info, Award, Mail } from 'lucide-react'

const NavItem = ({ to, icon: Icon, label, onClick }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </Link>
  )
}

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <aside
        className={`fixed left-0 top-0 h-full w-[290px] bg-white shadow-2xl border-r border-slate-100 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100">
          <div className="text-lg font-semibold">Menu</div>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          <NavItem to="/" icon={Home} label="Overview" onClick={() => setOpen(false)} />
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase">Sections</div>
          <a href="#tutorials" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900" onClick={() => setOpen(false)}>
            <BookText className="w-5 h-5" />
            <span className="font-medium">Tutorials</span>
          </a>
          <a href="#acknowledgement" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900" onClick={() => setOpen(false)}>
            <Award className="w-5 h-5" />
            <span className="font-medium">Acknowledgement</span>
          </a>
          <a href="#contact" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900" onClick={() => setOpen(false)}>
            <Mail className="w-5 h-5" />
            <span className="font-medium">Contact</span>
          </a>

          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase">Pages</div>
          <NavItem to="/graph" icon={GitBranch} label="Graph Editor" onClick={() => setOpen(false)} />
          <NavItem to="/ku-map" icon={Map} label="KU-Map Pathfinder" onClick={() => setOpen(false)} />
          <NavItem to="/team" icon={Users} label="Contact / Team" onClick={() => setOpen(false)} />
        </nav>

        <div className="mt-auto p-4 text-xs text-slate-400">
          <div className="flex items-center gap-2"><Info className="w-4 h-4" /> Light minimal theme</div>
        </div>
      </aside>
    </>
  )
}
