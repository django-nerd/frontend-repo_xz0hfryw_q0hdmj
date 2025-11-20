import React from 'react'
import { Github, Linkedin, CheckCircle2, Compass, GitBranch, Map, Award } from 'lucide-react'

export function AboutOverview() {
  return (
    <section id="overview" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">About</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Graph Path Finder is a clean, interactive environment to build graphs and watch Dijkstra in action. Designed with minimal UI and generous spacing to keep focus on learning and exploration.
            </p>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[{icon:GitBranch, title:'Interactive Graph Editor'}, {icon:Compass, title:'Dijkstra Visualization'}, {icon:Map, title:'KU Campus Pathfinder'}].map((f, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 flex items-center gap-3">
                  <f.icon className="w-5 h-5 text-slate-700" />
                  <span className="text-slate-700 font-medium">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <div id="acknowledgement" className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-slate-700"><Award className="w-5 h-5" /><span className="font-semibold">Acknowledgement</span></div>
              <p className="mt-2 text-sm text-slate-600">
                This project utilizes Dijkstra’s Algorithm, proposed by Edsger W. Dijkstra in 1956.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TutorialCarousel() {
  const steps = [
    { title: 'How to Add Nodes', text: 'Click the + Node button, then tap the canvas.' },
    { title: 'How to Create Edges', text: 'Choose + Edge, click source node then destination.' },
    { title: 'How to Set Weights', text: 'Click an edge to edit its weight.' },
    { title: 'How to Run Dijkstra', text: 'Press ▶ Run to visualize step-by-step.' },
    { title: 'How to Reset Visualization', text: 'Use Reset to clear highlights and states.' },
    { title: 'How to Use Navigation Menu', text: 'Tap the hamburger icon to open the sidebar.' },
  ]

  return (
    <section id="tutorials" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Quick Tutorial</h2>
          <div className="text-slate-500 text-sm">Swipe horizontally</div>
        </div>
        <div className="flex items-center gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none]" style={{scrollbarWidth:'none'}}>
          {steps.map((s, i) => (
            <article key={i} className="snap-start shrink-0 w-[86%] sm:w-[420px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="text-xs text-slate-500 font-semibold tracking-wide">Step {i+1}</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-slate-600 text-sm">{s.text}</p>
              <div className="mt-4 h-24 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-sm">
                Minimal illustration
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-5 mb-3">
          <a href="https://github.com" target="_blank" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition"><Github className="w-5 h-5 text-slate-700" /></a>
          <a href="https://linkedin.com" target="_blank" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition"><Linkedin className="w-5 h-5 text-slate-700" /></a>
        </div>
        <div className="text-slate-500 text-sm">Created by the Graph Path Finder team • contact@example.com</div>
      </div>
    </footer>
  )
}
