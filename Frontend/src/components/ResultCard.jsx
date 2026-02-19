import React, { useState } from 'react'
import {
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaCopy,
  FaCheck,
} from 'react-icons/fa'
import {
  getRiskBadgeClass,
  formatConfidence,
  formatSeverity,
  formatPhenotype,
  formatVariants,
  downloadJSON,
  copyToClipboard,
} from '../utils/formatJSON'
import './ResultCard.css'

export const ResultCard = ({ data }) => {
  const [expandedSections, setExpandedSections] = useState({
    risk: true,
    profile: true,
    variants: false,
    recommendation: false,
    explanation: false,
  })
  const [copied, setCopied] = useState(false)

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(data)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    downloadJSON(data, `pharmacogenomics_${data.patient_id}.json`)
  }

  if (!data) return null

  const riskAssessment = data.risk_assessment || {}
  const profile = data.pharmacogenomic_profile || {}
  const recommendation = data.clinical_recommendation || {}
  const explanation = data.llm_generated_explanation || {}
  const quality = data.quality_metrics || {}

  const phenotype = formatPhenotype(profile.phenotype)
  const variants = formatVariants(profile.detected_variants || [])

  return (
    <div className="result-card card-elevated animate-slide-up">
      {/* Header */}
      <div className="result-header">
        <div className="result-title-section">
          <h2 className="result-title">Analysis Results</h2>
          <p className="result-subtitle">
            Patient: {data.patient_id} • Drug: {data.drug}
          </p>
        </div>
        <div className="result-actions">
          <button
            className="btn-action"
            onClick={handleCopy}
            title="Copy JSON to clipboard"
            type="button"
          >
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
          <button
            className="btn-action"
            onClick={handleDownload}
            title="Download as JSON"
            type="button"
          >
            <FaDownload />
          </button>
        </div>
      </div>

      {/* Risk Assessment Summary */}
      <div className="result-section">
        <button
          className="section-header"
          onClick={() => toggleSection('risk')}
          type="button"
        >
          <span className="section-title">🎯 Risk Assessment</span>
          {expandedSections.risk ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {expandedSections.risk && (
          <div className="section-content">
            <div className="risk-summary">
              <div className="risk-main">
                <span
                  className={`risk-badge ${getRiskBadgeClass(
                    riskAssessment.risk_label
                  )}`}
                >
                  {riskAssessment.risk_label || 'Unknown'}
                </span>
                <div className="risk-details">
                  <p className="risk-confidence">
                    <strong>Confidence:</strong>{' '}
                    {formatConfidence(riskAssessment.confidence_score)}
                  </p>
                  <p className="risk-severity">
                    <strong>Severity:</strong>{' '}
                    {formatSeverity(riskAssessment.severity)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pharmacogenomic Profile */}
      <div className="result-section">
        <button
          className="section-header"
          onClick={() => toggleSection('profile')}
          type="button"
        >
          <span className="section-title">🧬 Pharmacogenomic Profile</span>
          {expandedSections.profile ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {expandedSections.profile && (
          <div className="section-content">
            <div className="profile-grid">
              <div className="profile-item">
                <label>Gene</label>
                <p>{profile.primary_gene || 'N/A'}</p>
              </div>
              <div className="profile-item">
                <label>Diplotype</label>
                <p>{profile.diplotype || 'N/A'}</p>
              </div>
              <div className="profile-item">
                <label>Phenotype</label>
                <div>
                  <p className="phenotype-code">{phenotype.short}</p>
                  <p className="phenotype-name">{phenotype.full}</p>
                  <p className="phenotype-description">{phenotype.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detected Variants */}
      {variants.length > 0 && (
        <div className="result-section">
          <button
            className="section-header"
            onClick={() => toggleSection('variants')}
            type="button"
          >
            <span className="section-title">
              📊 Detected Variants ({variants.length})
            </span>
            {expandedSections.variants ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {expandedSections.variants && (
            <div className="section-content">
              <div className="variants-list">
                {variants.map((variant, index) => (
                  <div key={index} className="variant-item">
                    <div className="variant-header">
                      <span className="variant-id">
                        {variant.rsid || variant.id || `Variant ${index + 1}`}
                      </span>
                      <span className="variant-gene">{variant.gene}</span>
                    </div>
                    {variant.impact && (
                      <p className="variant-impact">Impact: {variant.impact}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Clinical Recommendation */}
      {Object.keys(recommendation).length > 0 && (
        <div className="result-section">
          <button
            className="section-header"
            onClick={() => toggleSection('recommendation')}
            type="button"
          >
            <span className="section-title">💊 Clinical Recommendation</span>
            {expandedSections.recommendation ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </button>

          {expandedSections.recommendation && (
            <div className="section-content">
              <div className="recommendation-content">
                {recommendation.dosing && (
                  <div className="recommendation-item">
                    <h4>Dosing Recommendation</h4>
                    <p>{recommendation.dosing}</p>
                  </div>
                )}
                {recommendation.rationale && (
                  <div className="recommendation-item">
                    <h4>Rationale</h4>
                    <p>{recommendation.rationale}</p>
                  </div>
                )}
                {recommendation.monitoring && (
                  <div className="recommendation-item">
                    <h4>Monitoring</h4>
                    <p>{recommendation.monitoring}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* LLM Generated Explanation */}
      {Object.keys(explanation).length > 0 && (
        <div className="result-section">
          <button
            className="section-header"
            onClick={() => toggleSection('explanation')}
            type="button"
          >
            <span className="section-title">🤖 AI Explanation</span>
            {expandedSections.explanation ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown />
            )}
          </button>

          {expandedSections.explanation && (
            <div className="section-content">
              <div className="explanation-content">
                {explanation.summary && (
                  <div className="explanation-item">
                    <h4>Summary</h4>
                    <p>{explanation.summary}</p>
                  </div>
                )}
                {explanation.mechanism && (
                  <div className="explanation-item">
                    <h4>Biological Mechanism</h4>
                    <p>{explanation.mechanism}</p>
                  </div>
                )}
                {explanation.citations && (
                  <div className="explanation-item">
                    <h4>References</h4>
                    <ul>
                      {Array.isArray(explanation.citations)
                        ? explanation.citations.map((citation, idx) => (
                            <li key={idx}>{citation}</li>
                          ))
                        : [explanation.citations].map((citation, idx) => (
                            <li key={idx}>{citation}</li>
                          ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quality Metrics */}
      {Object.keys(quality).length > 0 && (
        <div className="result-section">
          <div className="quality-metrics">
            <h4>Quality Metrics</h4>
            <div className="metrics-grid">
              {Object.entries(quality).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <span className="metric-label">{key}</span>
                  <span className="metric-value">
                    {typeof value === 'boolean' ? (value ? '✓' : '✗') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="result-footer">
        <p className="result-timestamp">
          Generated: {new Date(data.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  )
}
