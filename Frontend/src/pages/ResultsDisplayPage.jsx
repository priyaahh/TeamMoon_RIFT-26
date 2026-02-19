import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { FaChartBar, FaInfoCircle, FaAward } from 'react-icons/fa'
import './FeaturePage.css'

const ResultsDisplayPage = () => {
  return (
    <>
      <Navbar />
      <div className="feature-page">
        <div className="feature-page-header">
          <h1>Results Display</h1>
          <p>View comprehensive pharmacogenomic analysis results with visual risk assessments</p>
        </div>
        
        <div className="feature-page-content">
          <div className="feature-section">
            <h2>Understanding Your Results</h2>
            
            <div className="info-section">
              <h3>Risk Levels</h3>
              <div className="risk-levels">
                <div className="risk-level high">
                  <span className="level-label">High Risk</span>
                  <p>Significant drug-gene interaction. Immediate action recommended.</p>
                </div>
                <div className="risk-level moderate">
                  <span className="level-label">Moderate Risk</span>
                  <p>Some concern. Consider alternative or dose adjustment.</p>
                </div>
                <div className="risk-level low">
                  <span className="level-label">Low Risk</span>
                  <p>Minimal interaction. Normal dosing typically appropriate.</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Result Components</h3>
              <ul>
                <li><strong>Variant Information:</strong> All detected variants and their classification</li>
                <li><strong>Gene Phenotype:</strong> Metabolizer status (e.g., poor, intermediate, normal, ultra-rapid)</li>
                <li><strong>Drug Recommendation:</strong> Guideline-based dosing recommendations</li>
                <li><strong>Clinical Impact:</strong> Detailed explanation of drug-gene interaction</li>
                <li><strong>Evidence Level:</strong> Strength of supporting clinical evidence</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Interactive Features</h3>
              <ul>
                <li>Expandable variant tables with genomic details</li>
                <li>Color-coded risk badges for quick reference</li>
                <li>Gene-specific information panels</li>
                <li>Clickable variants for detailed annotation</li>
                <li>Summary cards for each drug analysis</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Interpretation Guide</h3>
              <ul>
                <li>Each result includes CPIC clinical guideline recommendations</li>
                <li>Pharmacokinetic and pharmacodynamic information</li>
                <li>Dosing considerations based on metabolizer status</li>
                <li>Alternative medication suggestions when appropriate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResultsDisplayPage
