import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from './AppShell'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import AboutPage from './pages/AboutPage'
import CpicPage from './pages/CpicPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'cpic', element: <CpicPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />

export default AppRouter

