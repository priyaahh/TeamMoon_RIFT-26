import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import {
  FaFileDownload,
  FaCopy,
  FaShare,
  FaLock
} from 'react-icons/fa'
import './FeaturePage.css'

const ExportSharePage = () => {
  return (
    <>
      <Navbar />

      <div className="feature-page">
        <div className="feature-page-header">
          <h1>Export & Share Results</h1>
          <p>Download and securely share your pharmacogenomic analysis</p>
        </div>

        <div className="feature-page-content">
          <div className="feature-section">
            <div className="export-grid">
              
              <div className="export-card">
                <div className="export-icon"><FaFileDownload /></div>
                <h3>Download as JSON</h3>
                <p>Get structured analysis data for integration or advanced review</p>
                <ul>
                  <li>Complete variant data</li>
                  <li>Drug-gene interactions</li>
                  <li>Risk classifications</li>
                  <li>EHR-compatible format</li>
                </ul>
              </div>

              <div className="export-card">
                <div className="export-icon"><FaCopy /></div>
                <h3>Copy to Clipboard</h3>
                <p>Quick access to formatted results for sharing or documentation</p>
                <ul>
                  <li>Clinical summaries</li>
                  <li>Ready to paste</li>
                  <li>Professional format</li>
                </ul>
              </div>

              <div className="export-card">
                <div className="export-icon"><FaShare /></div>
                <h3>Secure Share</h3>
                <p>Generate controlled-access links for healthcare providers</p>
                <ul>
                  <li>Anonymous links</li>
                  <li>Expirable access</li>
                  <li>Password protected</li>
                </ul>
              </div>

              <div className="export-card">
                <div className="export-icon"><FaLock /></div>
                <h3>Data Security</h3>
                <p>Your data is encrypted and compliant with healthcare standards</p>
                <ul>
                  <li>HIPAA compliant</li>
                  <li>Encrypted transit & storage</li>
                  <li>User-controlled retention</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ExportSharePage
