import React from 'react'

export const AboutPage = () => {
  return (
    <div className="results-container animate-fade-in">
      <div className="results-header">
        <h2>About PharmaGuard</h2>
        <p className="results-count">
          Pharmacogenomic risk prediction for safer, personalized prescribing.
        </p>
      </div>

      <div className="card">
        <p style={{ lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
          PharmaGuard analyzes patient genomic variants (VCF) across key pharmacogenes and predicts
          drug-specific risks. It produces structured JSON outputs for evaluation, plus explainable
          summaries and clinical recommendations aligned with CPIC guidance.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <div className="badge badge-adjust">VCF v4.2</div>{' '}
          <div className="badge badge-safe">Explainable AI</div>{' '}
          <div className="badge badge-unknown">CPIC-aligned</div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

