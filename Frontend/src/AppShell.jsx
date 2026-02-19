import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import './App.css'

import { Navbar } from './components/Navbar'
import { Footer } from './components/layout/Footer'

export const AppShell = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="app">
      <ScrollToTop />
      <div className="app-shell">
        {!isHomePage && <Navbar />}
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

