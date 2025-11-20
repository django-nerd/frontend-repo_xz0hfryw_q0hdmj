import React, { useRef, useState, useMemo } from 'react'
import { Menu, Plus, GitBranch, Hand, Pencil, Trash2, Play, RotateCcw, ZoomIn, ZoomOut, ChevronDown } from 'lucide-react'

function ToolbarButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow transition relative ${active ? 'ring-2 ring-teal-400' : ''}`}
      title={label}
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-slate-700" />
    </button>
  )
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button onClick={() => setOpen(o=>!o)} className="w-full flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-slate-700">{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 text-sm text-slate-600">{children}</div>}
    </div>
  )
}

export default function GraphEditorPage({ onMenu }) {
  const [mode, setMode] = useState('select')
  const [nodes, setNodes] = useState([]) // {id,x,y}
  const [edges, setEdges] = useState([]) // {id,from,to,weight}
  const [scale, setScale] = useState(1)
  const [running, setRunning] = useState(false)
  const canvasRef = useRef(null)
  const [pendingEdge, setPendingEdge] = useState(null)

  const nextId = useMemo(() => () => Math.random().toString(36).slice(2,9), [])

  function toCanvasCoords(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / scale
    const y = (e.clientY - rect.top) / scale
    return { x, y }
  }

  function onCanvasClick(e) {
    if (mode === 'add-node') {
      const { x, y } = toCanvasCoords(e)
      setNodes(ns => [...ns, { id: nextId(), x, y }])
    }
  }

  function onNodeMouseDown(id, e) {
    if (mode === 'add-edge') {
      setPendingEdge({ from: id })
      e.stopPropagation()
      return
    }
    if (mode === 'select') {
      const start = toCanvasCoords(e)
      const idx = nodes.findIndex(n => n.id === id)
      const startNode = nodes[idx]
      function onMove(ev) {
        const p = toCanvasCoords(ev)
        const dx = p.x - start.x
        const dy = p.y - start.y
        setNodes(ns => ns.map(n => n.id === id ? { ...n, x: startNode.x + dx, y: startNode.y + dy } : n))
      }
      function onUp() {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
      e.stopPropagation()
    }
  }

  function onNodeClick(id) {
    if (mode === 'add-edge' && pendingEdge?.from && pendingEdge.from !== id) {
      const weight = 1
      setEdges(es => [...es, { id: nextId(), from: pendingEdge.from, to: id, weight }])
      setPendingEdge(null)
    }
  }

  function runDijkstra() {
    if (nodes.length === 0) return
    setRunning(true)
    setTimeout(() => setRunning(false), 800)
  }

  function reset() {
    setEdges([])
    setNodes([])
    setRunning(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 overflow-x-auto">
          <button onClick={onMenu} className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm"><Menu className="w-5 h-5"/></button>
          <div className="flex items-center gap-2">
            <ToolbarButton icon={Plus} label="Add Node" active={mode==='add-node'} onClick={() => setMode('add-node')} />
            <ToolbarButton icon={GitBranch} label="Add Edge" active={mode==='add-edge'} onClick={() => setMode('add-edge')} />
            <ToolbarButton icon={Hand} label="Select / Move" active={mode==='select'} onClick={() => setMode('select')} />
            <ToolbarButton icon={Pencil} label="Edit" active={mode==='edit'} onClick={() => setMode('edit')} />
            <ToolbarButton icon={Trash2} label="Delete" onClick={() => { setNodes([]); setEdges([]) }} />
            <ToolbarButton icon={Play} label="Run Dijkstra" onClick={runDijkstra} />
            <ToolbarButton icon={RotateCcw} label="Reset" onClick={reset} />
            <ToolbarButton icon={ZoomIn} label="Zoom In" onClick={() => setScale(s=>Math.min(2, s+0.1))} />
            <ToolbarButton icon={ZoomOut} label="Zoom Out" onClick={() => setScale(s=>Math.max(0.5, s-0.1))} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-4 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-3">
          <div
            ref={canvasRef}
            onClick={onCanvasClick}
            className="relative h-[60vh] sm:h-[68vh] rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}
          >
            {/* Edges */}
            <svg className="absolute inset-0 w-full h-full">
              {edges.map(e => {
                const a = nodes.find(n => n.id === e.from)
                const b = nodes.find(n => n.id === e.to)
                if (!a || !b) return null
                const visitedColor = running ? '#0ea5e9' : '#cbd5e1'
                return (
                  <g key={e.id}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={visitedColor} strokeWidth={2} />
                    <text x={(a.x+b.x)/2} y={(a.y+b.y)/2 - 6} className="fill-slate-500 text-xs">{e.weight}</text>
                  </g>
                )
              })}
            </svg>

            {/* Nodes */}
            {nodes.map(n => (
              <button
                key={n.id}
                onMouseDown={(e)=>onNodeMouseDown(n.id, e)}
                onClick={()=>onNodeClick(n.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-sm border ${running ? 'bg-teal-400 border-teal-500' : 'bg-white border-slate-300'}`}
                style={{ left: n.x, top: n.y }}
                title={`Node ${n.id}`}
                aria-label={`Node ${n.id}`}
              />
            ))}
          </div>
        </div>
        {/* Tutorial Accordion */}
        <div className="lg:col-span-1 space-y-3">
          {[
            {t:'How to Add Nodes', d:'Choose + Node, then click anywhere on the canvas.'},
            {t:'How to Draw Edges', d:'Select + Edge, click a source node then a destination.'},
            {t:'How to Run Dijkstra', d:'Press ▶ Run to visualize. Current node and visited nodes will highlight.'},
            {t:'How to Reset Graph', d:'Use Reset to clear the canvas and start again.'},
          ].map((it,i)=> (
            <Accordion key={i} title={it.t}>{it.d}</Accordion>
          ))}
        </div>
      </div>
    </div>
  )
}
