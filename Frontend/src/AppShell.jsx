import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import './App.css'

export const AppShell = () => {
  return (
    <div className="app">
      <ScrollToTop />
      <div className="app-shell">
        <main className="app-main">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppShell

