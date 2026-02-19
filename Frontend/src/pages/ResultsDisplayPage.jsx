import React, { useState } from 'react'
import Footer from '../components/layout/Footer'
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaChevronDown,
  FaChevronUp,
  FaFileDownload,
  FaCopy,
  FaNotesMedical,
  FaDna,
  FaStethoscope,
  FaRobot
} from 'react-icons/fa'
import './FeaturePage.css'

// Strict JSON Schema Mock Data
const mockData = {
  "patient_id": "PATIENT_001",
  "drug": "WARFARIN",
  "timestamp": new Date().toISOString(),
  "risk_assessment": {
    "risk_label": "Adjust Dosage",
    "confidence_score": 0.95,
    "severity": "moderate"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "CYP2C9",
    "diplotype": "*2/*3",
    "phenotype": "Poor Metabolizer",
    "detected_variants": [
      {
        "rsid": "rs1799853",
        "genotype": "CT"
      },
      {
        "rsid": "rs1057910",
        "genotype": "AC"
      }
    ]
  },
  "clinical_recommendation": {
    "recommendation": "Consider a 50% reduction in starting dose due to reduced enzyme activity. Monitor INR closely.",
    "guideline_source": "CPIC"
  },
  "llm_generated_explanation": {
    "summary": "The patient carries variants in CYP2C9 that significantly reduce enzyme activity, increasing the risk of bleeding with standard Warfarin dosing."
  },
  "quality_metrics": {
    "vcf_parsing_success": true,
    "variant_coverage": 0.99
  }
}

const ResultsDisplayPage = () => {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // Determine styles based on risk label
  const getRiskStyles = (label) => {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('safe') || lowerLabel.includes('normal')) {
      return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: <FaCheckCircle /> } // Green
    } else if (lowerLabel.includes('adjust') || lowerLabel.includes('monitor') || lowerLabel.includes('moderate')) {
      return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: <FaExclamationTriangle /> } // Yellow
    } else {
      return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', icon: <FaTimesCircle /> } // Red
    }
  }

  const riskStyle = getRiskStyles(mockData.risk_assessment.risk_label)

  return (
    <>
      <div className="feature-page">
        <div className="feature-page-header">
          <h1>Analysis Results</h1>
          <p>Pharmacogenomic Report for {mockData.drug}</p>
        </div>

        <div className="feature-page-content">
          <div className="feature-section">

            {/* Risk Assessment Card */}
            <div className="feature-box" style={{ borderColor: riskStyle.color, borderWidth: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  fontSize: '2.5rem',
                  color: riskStyle.color,
                  background: riskStyle.bg,
                  padding: '1rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {riskStyle.icon}
                </div>
                <div>
                  <h2 style={{ margin: 0, color: riskStyle.color }}>{mockData.risk_assessment.risk_label}</h2>
                  <p style={{ margin: '0.2rem 0 0 0', opacity: 0.8 }}>
                    Confidence Score: {(mockData.risk_assessment.confidence_score * 100).toFixed(0)}% | Severity: {mockData.risk_assessment.severity}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                {mockData.llm_generated_explanation.summary}
              </p>
            </div>

            {/* Expandable Sections */}
            <div className="accordion-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>

              {/* Clinical Recommendation */}
              <div className="feature-box" style={{ padding: '0' }}>
                <button
                  onClick={() => toggleSection('clinical')}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <FaStethoscope style={{ color: 'var(--color-primary-400)' }} />
                    Clinical Recommendation
                  </div>
                  {expandedSection === 'clinical' ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedSection === 'clinical' && (
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid var(--color-border-light)' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '0.5rem' }}>
                      {mockData.clinical_recommendation.recommendation}
                    </p>
                    <small style={{ color: 'var(--color-text-tertiary)' }}>
                      Guideline Source: {mockData.clinical_recommendation.guideline_source}
                    </small>
                  </div>
                )}
              </div>

              {/* Pharmacogenomic Profile */}
              <div className="feature-box" style={{ padding: '0' }}>
                <button
                  onClick={() => toggleSection('profile')}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <FaDna style={{ color: 'var(--color-accent-400)' }} />
                    Pharmacogenomic Profile
                  </div>
                  {expandedSection === 'profile' ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedSection === 'profile' && (
                  <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', borderTop: '1px solid var(--color-border-light)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div className="info-item">
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Primary Gene</span>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{mockData.pharmacogenomic_profile.primary_gene}</div>
                      </div>
                      <div className="info-item">
                        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Phenotype</span>
                        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{mockData.pharmacogenomic_profile.phenotype}</div>
                      </div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Detected Variants</span>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {mockData.pharmacogenomic_profile.detected_variants.map((v, i) => (
                          <span key={i} style={{
                            background: 'var(--color-bg-dark)',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            border: '1px solid var(--color-border-medium)'
                          }}>
                            {v.rsid} ({v.genotype})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* JSON Download & Copy Card */}
            <div className="feature-box" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FaFileDownload style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }} />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Export Data</h3>
              </div>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                Download your complete analysis results in JSON format or copy to clipboard.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                <button
                  style={{
                    width: 'auto',
                    minWidth: '200px',
                    justifyContent: 'center',
                    background: 'var(--color-primary-600)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Download .json
                </button>
                <div style={{
                  width: '100%',
                  background: '#1e293b',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  overflow: 'hidden',
                  marginTop: '1rem',
                  position: 'relative'
                }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(mockData, null, 2))
                      alert('Copied to clipboard!')
                    }}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.4rem 0.8rem',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                    title="Copy to clipboard"
                  >
                    <FaCopy /> Copy
                  </button>
                  <pre style={{
                    margin: 0,
                    color: '#94a3b8',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    overflowX: 'auto'
                  }}>
                    {JSON.stringify(mockData, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ResultsDisplayPage
