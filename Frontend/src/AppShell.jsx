import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import './App.css'

export const AppShell = () => {
  return (
    <div className="app">
      <div className="app-shell">
        <Navbar />

        <main className="app-main">
          <div className="container">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default AppShell

