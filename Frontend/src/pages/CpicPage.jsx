import React from 'react'

export const CpicPage = () => {
  return (
    <div className="results-container animate-fade-in">
      <div className="results-header">
        <h2>CPIC Guidance</h2>
        <p className="results-count">Dosing recommendations should follow current CPIC guidelines.</p>
      </div>

      <div className="card">
        <p style={{ lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
          This app surfaces pharmacogenomic risk and suggestions, but it is not a substitute for
          clinical judgement. Always confirm recommendations against the latest CPIC guidance and
          local protocols.
        </p>

        <div style={{ marginTop: '1rem' }}>
          <div className="grid grid-2">
            <div className="card">
              <h3 style={{ marginBottom: '0.5rem' }}>Supported genes</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                CYP2D6, CYP2C19, CYP2C9, SLCO1B1, TPMT, DPYD
              </p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: '0.5rem' }}>Supported drugs</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                CODEINE, WARFARIN, CLOPIDOGREL, SIMVASTATIN, AZATHIOPRINE, FLUOROURACIL
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CpicPage

