import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className="results-container animate-fade-in">
      <div className="results-header">
        <h2>Page Not Found</h2>
        <p className="results-count">The page you’re looking for doesn’t exist.</p>
      </div>

      <Link className="btn btn-primary btn-new-analysis" to="/">
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage

