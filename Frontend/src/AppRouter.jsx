import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from './AppShell'
import ScrollToTop from './ScrollToTop'
import HomePage from './pages/HomePage'

import AboutPage from './pages/AboutPage'
import CpicPage from './pages/CpicPage'
import NotFoundPage from './pages/NotFoundPage'
import VcfUploadPage from './pages/VcfUploadPage'
import DrugInputPage from './pages/DrugInputPage'
import ResultsDisplayPage from './pages/ResultsDisplayPage'
import ExportSharePage from './pages/ExportSharePage'

import ErrorHandlingPage from './pages/ErrorHandlingPage'
import AiInsightsPage from './pages/AiInsightsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },

      { path: 'about', element: <AboutPage /> },
      { path: 'cpic', element: <CpicPage /> },
      { path: 'vcf-upload', element: <VcfUploadPage /> },
      { path: 'drug-input', element: <DrugInputPage /> },
      { path: 'results-display', element: <ResultsDisplayPage /> },
      { path: 'export-share', element: <ExportSharePage /> },
      { path: 'error-handling', element: <ErrorHandlingPage /> },
      { path: 'ai-insights', element: <AiInsightsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />

export default AppRouter

