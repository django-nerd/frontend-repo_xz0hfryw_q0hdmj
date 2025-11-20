import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Header from './components/Header'
import { AboutOverview, TutorialCarousel, Footer } from './components/HomeSections'
import GraphEditorPage from './components/GraphEditor'
import KUMapPage from './components/KUMap'

function Home() {
  return (
    <Layout>
      {({ onMenu }) => (
        <>
          <Header onMenu={onMenu} />
          <AboutOverview />
          <TutorialCarousel />
          <Footer />
        </>
      )}
    </Layout>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graph" element={<Layout>{({onMenu}) => <GraphEditorPage onMenu={onMenu} />}</Layout>} />
      <Route path="/ku-map" element={<Layout>{({onMenu}) => <KUMapPage onMenu={onMenu} />}</Layout>} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
