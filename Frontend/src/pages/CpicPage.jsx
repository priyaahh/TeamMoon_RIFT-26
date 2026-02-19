import React from 'react'
import Footer from '../components/layout/Footer'
import { FaBook, FaDna, FaPills, FaCode, FaCheckCircle } from 'react-icons/fa'
import './FeaturePage.css'

const CpicPage = () => {
  return (
    <>
      <div className="feature-page">
        <div className="feature-page-header">
          <h1>CPIC Guidelines & Compliance</h1>
          <p>
            Adhering to Clinical Pharmacogenetics Implementation Consortium (CPIC) standards
            for precision medicine.
          </p>
        </div>

        <div className="feature-page-content">
          <div className="feature-section">

            <h2>Core Challenge Alignment</h2>
            <p className="section-intro">
              PharmaGuard is built to address the specific requirements of the RIFT 2026 Pharmacogenomics Track,
              ensuring clinical validity and standard compliance.
            </p>

            <div className="grid-2-col">
              <div className="info-section">
                <h3><FaDna /> Critical Genes Analyzed</h3>
                <p>We target the 6 specific genes required for the precision medicine algorithm:</p>
                <div className="tag-cloud">
                  <span className="tag">CYP2D6</span>
                  <span className="tag">CYP2C19</span>
                  <span className="tag">CYP2C9</span>
                  <span className="tag">SLCO1B1</span>
                  <span className="tag">TPMT</span>
                  <span className="tag">DPYD</span>
                </div>
              </div>

              <div className="info-section">
                <h3><FaPills /> Target Medications</h3>
                <p>Validated pharmacogenomic associations for the following drugs:</p>
                <div className="tag-cloud">
                  <span className="tag">CODEINE</span>
                  <span className="tag">WARFARIN</span>
                  <span className="tag">CLOPIDOGREL</span>
                  <span className="tag">SIMVASTATIN</span>
                  <span className="tag">AZATHIOPRINE</span>
                  <span className="tag">FLUOROURACIL</span>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3><FaCheckCircle /> Standardized Risk Prediction</h3>
              <p>Risk assessments are categorized into 5 clinically actionable levels:</p>
              <ul className="risk-list">
                <li className="risk-item safe"><span className="dot"></span> <strong>Safe:</strong> Standard dosing guidelines apply.</li>
                <li className="risk-item adjust"><span className="dot"></span> <strong>Adjust Dosage:</strong> Modified dosage or monitoring required.</li>
                <li className="risk-item toxic"><span className="dot"></span> <strong>Toxic:</strong> High risk of adverse reaction. Avoid use.</li>
                <li className="risk-item ineffective"><span className="dot"></span> <strong>Ineffective:</strong> Drug likely to have reduced efficacy.</li>
                <li className="risk-item unknown"><span className="dot"></span> <strong>Unknown:</strong> Insufficient evidence for classification.</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaCode /> Schema Compliance</h3>
              <p>
                System outputs strictly adhere to the mandatory JSON schema for interoperability:
              </p>
              <div className="code-block">
                <pre>
                  {`{
  "patient_id": "PATIENT_XXX",
  "risk_assessment": {
    "risk_label": "Safe|Adjust Dosage|...",
    "confidence_score": 0.95
  },
  "pharmacogenomic_profile": {
    "diplotype": "*1/*17",
    "phenotype": "Ultrarapid Metabolizer"
  }
}`}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CpicPage
