import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaDna,
  FaFlask,
  FaChartBar,
  FaBrain,
  FaUpload,
  FaPills,
  FaCheckCircle,
  FaFileDownload
} from 'react-icons/fa'
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate()

  const goTo = (path) => () => navigate(path)

  return (
    <div className="home-page">

      {/* HERO SECTION WITH PRIMARY CTA */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            PHARMA GUARD
            <span className="hero-subtitle-text">
              Revolutionizing Drug Safety Through Genetic Intelligence
            </span>
          </h1>

          <p className="hero-subtitle">
            AI-powered pharmacogenomic risk prediction platform that analyzes
            genomic data to deliver personalized medication safety insights.
          </p>

          <button
            className="hero-get-started-btn"
            onClick={goTo('/platform')}
          >
            Ready to Get Started?
          </button>
        </div>
      </section>

      {/* PROBLEM OVERVIEW */}
      <section className="problem-section">
        <div className="container">
          <h2>Why Pharmacogenomics Matters</h2>
          <div className="problem-content">
            <p>
              Adverse drug reactions remain a leading preventable cause of mortality.
            </p>
            <p>
              Genetic variation in drug-metabolizing enzymes directly impacts
              treatment safety and effectiveness.
            </p>
            <p className="highlight">
              Our platform combines genomics and AI to support safer prescribing.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM SNAPSHOT */}
      <section className="platform-snapshot">
        <div className="container">
          <h2>Platform Capabilities</h2>
          <div className="snapshot-grid">

            <div className="snapshot-card" onClick={goTo('/platform')}>
              <FaDna className="card-icon" />
              <h3>Genomic Variant Analysis</h3>
              <p>Advanced VCF parsing and classification</p>
            </div>

            <div className="snapshot-card" onClick={goTo('/platform')}>
              <FaPills className="card-icon" />
              <h3>Drug-Gene Interaction Mapping</h3>
              <p>Pharmacogenomic association alignment</p>
            </div>

            <div className="snapshot-card" onClick={goTo('/platform')}>
              <FaChartBar className="card-icon" />
              <h3>Risk Classification Engine</h3>
              <p>Intelligent risk level assessment</p>
            </div>

            <div className="snapshot-card" onClick={goTo('/platform')}>
              <FaBrain className="card-icon" />
              <h3>AI Clinical Insights</h3>
              <p>Explainable and interpretable outputs</p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps-grid">

            <div className="step">
              <div className="step-number">1</div>
              <FaUpload className="step-icon" />
              <h3>Upload Genomic Data</h3>
              <p>Securely upload your VCF file</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <FaPills className="step-icon" />
              <h3>Select Medication</h3>
              <p>Choose one or multiple drugs</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <FaFlask className="step-icon" />
              <h3>AI Variant Interpretation</h3>
              <p>Analyze genetic-drug interactions</p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <FaCheckCircle className="step-icon" />
              <h3>Receive Risk Report</h3>
              <p>Personalized pharmacogenomic insights</p>
            </div>

          </div>
        </div>
      </section>

      {/* WEB INTERFACE FEATURES */}
      <section className="web-interface-features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">

            <div className="feature-card" onClick={goTo('/vcf-upload')}>
              <div className="feature-icon"><FaUpload /></div>
              <h3>File Upload Interface</h3>
              <ul>
                <li>Drag-and-drop or file picker</li>
                <li>VCF validation before processing</li>
                <li>File size limit indicator</li>
              </ul>
            </div>

            <div className="feature-card" onClick={goTo('/drug-input')}>
              <div className="feature-icon"><FaPills /></div>
              <h3>Drug Input Field</h3>
              <ul>
                <li>Text input or dropdown</li>
                <li>Multiple drug support</li>
                <li>Input validation</li>
              </ul>
            </div>

            <div className="feature-card" onClick={goTo('/results-display')}>
              <div className="feature-icon"><FaChartBar /></div>
              <h3>Results Display</h3>
              <ul>
                <li>Clear risk visualization</li>
                <li>Color-coded labels</li>
                <li>Expandable sections</li>
              </ul>
            </div>

            <div className="feature-card" onClick={goTo('/export-share')}>
              <div className="feature-icon"><FaFileDownload /></div>
              <h3>Export & Share</h3>
              <ul>
                <li>Download JSON output</li>
                <li>Copy-to-clipboard</li>
                <li>Secure data handling</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default HomePage
