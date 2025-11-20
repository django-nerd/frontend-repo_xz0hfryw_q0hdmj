import React, { useMemo, useState } from 'react'
import { Menu, Play } from 'lucide-react'

const BUILDINGS = [
  { id: 'A', name: 'Admin' },
  { id: 'L', name: 'Library' },
  { id: 'E', name: 'Engineering' },
  { id: 'S', name: 'Science' },
  { id: 'H', name: 'Hostel' },
]

const POS = {
  A: { x: 80, y: 120 },
  L: { x: 220, y: 80 },
  E: { x: 360, y: 140 },
  S: { x: 260, y: 240 },
  H: { x: 120, y: 220 },
}

const EDGES = [
  ['A','L',2], ['L','E',3], ['A','H',4], ['H','S',2], ['S','E',2], ['L','S',3]
]

export default function KUMapPage({ onMenu }) {
  const [start, setStart] = useState('A')
  const [dest, setDest] = useState('E')
  const [path, setPath] = useState([])
  const [running, setRunning] = useState(false)

  const nodes = useMemo(() => BUILDINGS.map(b => ({ id: b.id, ...POS[b.id] })), [])

  function findPath() {
    // Simple Dijkstra over the static graph
    setRunning(true)
    const graph = {}
    BUILDINGS.forEach(b => graph[b.id] = {})
    EDGES.forEach(([u,v,w]) => { graph[u][v]=w; graph[v][u]=w })

    const dist = {}; const prev = {}; const Q = new Set(BUILDINGS.map(b=>b.id))
    BUILDINGS.forEach(b => dist[b.id] = Infinity)
    dist[start] = 0
    while (Q.size) {
      let u = null; let best = Infinity
      Q.forEach(n => { if (dist[n] < best) { best = dist[n]; u = n } })
      if (u === null) break
      Q.delete(u)
      if (u === dest) break
      Object.entries(graph[u]).forEach(([v,w]) => {
        if (!Q.has(v)) return
        const alt = dist[u] + w
        if (alt < dist[v]) { dist[v] = alt; prev[v] = u }
      })
    }
    const rev = []
    let u = dest
    while (u) { rev.push(u); u = prev[u] }
    setPath(rev.reverse())
    setTimeout(()=> setRunning(false), 600)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button onClick={onMenu} className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm"> <Menu className="w-5 h-5"/> </button>
          <div className="ml-auto flex items-center gap-3">
            <select value={start} onChange={e=>setStart(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm">
              {BUILDINGS.map(b=> <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <span className="text-slate-500 text-sm">to</span>
            <select value={dest} onChange={e=>setDest(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm">
              {BUILDINGS.map(b=> <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <button onClick={findPath} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-500 text-white text-sm shadow hover:bg-teal-600">
              <Play className="w-4 h-4"/> Find Shortest Path
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <div className="relative h-[60vh] rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <svg className="absolute inset-0 w-full h-full">
              {/* Edges */}
              {EDGES.map(([u,v,w],i)=>{
                const a = POS[u]; const b = POS[v]
                const inPath = path.includes(u) && path.includes(v) && Math.abs(path.indexOf(u)-path.indexOf(v))===1
                return (
                  <g key={i}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={inPath? '#0ea5e9':'#cbd5e1'} strokeWidth={inPath?3:2} />
                    <text x={(a.x+b.x)/2} y={(a.y+b.y)/2 - 6} className="fill-slate-500 text-xs">{w}</text>
                  </g>
                )
              })}
              {/* Nodes */}
              {nodes.map(n => {
                const active = path.includes(n.id)
                return (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r={16} fill={active? '#14b8a6':'white'} stroke={active? '#0f766e':'#94a3b8'} strokeWidth={2} />
                    <text x={n.x} y={n.y+36} textAnchor="middle" className="fill-slate-600 text-sm">{BUILDINGS.find(b=>b.id===n.id)?.name}</text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
        {/* Tutorial */}
        <div className="lg:col-span-1 space-y-3">
          <details className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-medium text-slate-700">How to choose start and end buildings</summary>
            <p className="mt-2 text-sm text-slate-600">Use the dropdowns on the top right to select buildings, then click Find Shortest Path.</p>
          </details>
          <details className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-medium text-slate-700">How KU shortest path is calculated</summary>
            <p className="mt-2 text-sm text-slate-600">We run Dijkstra’s algorithm on a pre-defined campus graph with edge weights representing distances.</p>
          </details>
          <details className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer text-sm font-medium text-slate-700">How the visual highlights represent distance/steps</summary>
            <p className="mt-2 text-sm text-slate-600">Highlighted nodes and edges indicate the resulting shortest path.</p>
          </details>
        </div>
      </div>
    </div>
  )
}
