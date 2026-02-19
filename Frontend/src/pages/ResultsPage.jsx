import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RiskCard } from '../components/results/RiskCard'
import { JsonViewer } from '../components/JsonViewer'
import { clearResults, loadResults, saveResults } from '../utils/resultsStore'

export const ResultsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const stored = useMemo(() => loadResults(), [])
  const initial = location.state || stored

  const [results, setResults] = useState(initial)

  const hasResults = Boolean(results && Array.isArray(results.results) && results.results.length > 0)
  const currentResult = hasResults ? results.results[results.current || 0] : null
  const isMultiple = hasResults ? results.results.length > 1 : false

  const persist = (next) => {
    setResults(next)
    saveResults(next)
  }

  const handleNext = () => {
    if (!hasResults) return
    if ((results.current || 0) < results.results.length - 1) {
      persist({ ...results, current: (results.current || 0) + 1 })
    }
  }

  const handlePrev = () => {
    if (!hasResults) return
    if ((results.current || 0) > 0) {
      persist({ ...results, current: (results.current || 0) - 1 })
    }
  }

  const handleReset = () => {
    clearResults()
    navigate('/')
  }

  if (!hasResults) {
    return (
      <div className="results-container animate-fade-in">
        <div className="results-header">
          <h2>No Results Yet</h2>
          <p className="results-count">Upload a VCF and analyze at least one drug to see results.</p>
        </div>
        <button className="btn btn-primary btn-new-analysis" onClick={handleReset} type="button">
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <div className="results-container animate-fade-in">
      <div className="results-header">
        <h2>Analysis Complete</h2>
        {isMultiple && (
          <p className="results-count">
            Result {(results.current || 0) + 1} of {results.results.length}
          </p>
        )}
      </div>

      {currentResult && (
        <>
          <RiskCard data={currentResult} />
          <div style={{ marginTop: '2rem' }}>
            <JsonViewer data={currentResult} title="Structured JSON Output" />
          </div>
        </>
      )}

      {isMultiple && (
        <div className="results-navigation">
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={(results.current || 0) === 0}
            type="button"
          >
            ← Previous
          </button>

          <div className="drug-indicator">
            {results.results.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === (results.current || 0) ? 'active' : ''}`}
                onClick={() => persist({ ...results, current: index })}
                title={`View result ${index + 1}`}
                type="button"
              />
            ))}
          </div>

          <button
            className="btn btn-secondary"
            onClick={handleNext}
            disabled={(results.current || 0) === results.results.length - 1}
            type="button"
          >
            Next →
          </button>
        </div>
      )}

      <button className="btn btn-primary btn-new-analysis" onClick={handleReset} type="button">
        New Analysis
      </button>
    </div>
  )
}

export default ResultsPage

