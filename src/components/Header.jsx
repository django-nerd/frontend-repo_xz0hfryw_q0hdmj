import React from 'react'
import Spline from '@splinetool/react-spline'
import { Menu } from 'lucide-react'

export default function Header({ onMenu }) {
  return (
    <section className="relative h-[64vh] min-h-[420px] w-full overflow-hidden bg-white">
      {/* Spline Background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay to improve contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-white/30 pointer-events-none" />

      <div className="relative h-full flex flex-col">
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 h-16">
          <button aria-label="Open menu" onClick={onMenu} className="p-2 rounded-xl bg-white/80 shadow-sm hover:shadow md:p-2">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
          <div className="text-sm text-slate-500">Light • Minimal</div>
        </div>

        <div className="flex-1 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Graph Path Finder
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              A minimalist tool to visualize Dijkstra’s Algorithm and explore pathfinding.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
