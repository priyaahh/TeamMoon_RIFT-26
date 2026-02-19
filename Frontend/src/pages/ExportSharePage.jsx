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
          <p>
            Securely download and share pharmacogenomic analysis outputs
          </p>
        </div>

        <div className="feature-page-content">
          <div className="feature-section">

            <h2>Export Options</h2>

            <div className="info-section">
              <h3><FaFileDownload /> Download as JSON</h3>
              <p>
                Export complete analysis results in structured JSON format
                for system integration or advanced review.
              </p>
              <ul>
                <li>Variant data with clinical annotations</li>
                <li>Drug-gene interaction findings</li>
                <li>Risk classifications and recommendations</li>
                <li>Analysis metadata and timestamps</li>
                <li>EHR-compatible structured format</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaCopy /> Copy to Clipboard</h3>
              <p>
                Quickly copy formatted summaries or specific sections
                for secure communication.
              </p>
              <ul>
                <li>Formatted clinical summaries</li>
                <li>Direct paste into documentation or email</li>
                <li>Clinically relevant highlights included</li>
                <li>Readable, structured layout</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaShare /> Share Results</h3>
              <p>
                Generate controlled-access links for healthcare professionals.
              </p>
              <ul>
                <li>Anonymized shareable links</li>
                <li>Configurable expiration periods</li>
                <li>Password-protected access option</li>
                <li>Optional access logging</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaLock /> Data Security</h3>
              <ul>
                <li><strong>Encryption:</strong> Data encrypted in transit and at rest</li>
                <li><strong>Privacy Controls:</strong> No identifiers stored without consent</li>
                <li><strong>Compliance:</strong> HIPAA- and GDPR-aligned practices</li>
                <li><strong>Retention Policy:</strong> User-controlled deletion (default 30 days)</li>
                <li><strong>Access Management:</strong> Restricted to authorized users</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Clinical Use Cases</h3>
              <ul>
                <li>Share with prescribing physicians for therapy optimization</li>
                <li>Provide to pharmacists for medication counseling</li>
                <li>Archive within patient medical records</li>
                <li>Integrate into pharmacy management systems</li>
                <li>Support clinical research initiatives</li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default ExportSharePage
