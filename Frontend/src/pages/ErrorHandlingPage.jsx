import React from 'react'
import Footer from '../components/layout/Footer'
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaQuestion
} from 'react-icons/fa'
import './FeaturePage.css'

const ErrorHandlingPage = () => {
  return (
    <>

      <div className="feature-page">

        <div className="feature-page-header">
          <h1>Error Handling & Validation</h1>
          <p>
            Comprehensive validation and structured error messaging
            for reliable pharmacogenomic analysis
          </p>
        </div>

        <div className="feature-page-content">
          <div className="feature-section">

            <h2>File Validation</h2>

            <div className="info-section">
              <h3><FaCheckCircle /> Validation Checks</h3>
              <ul>
                <li><strong>Format Validation:</strong> Verification of VCF header and column structure</li>
                <li><strong>Chromosome Validation:</strong> Accepted notation (chr1–22, X, Y)</li>
                <li><strong>Coordinate Integrity:</strong> Proper 1-based genomic positions</li>
                <li><strong>Allele Consistency:</strong> REF and ALT allele validation</li>
                <li><strong>File Size Limits:</strong> Enforced upload size threshold</li>
                <li><strong>Encoding Check:</strong> UTF-8 or ASCII format verification</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaExclamationTriangle /> Common Error Messages</h3>
              <ul>
                <li><strong>Invalid VCF Format:</strong> File does not meet required VCF specifications</li>
                <li><strong>Missing Columns:</strong> Required fields (CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO)</li>
                <li><strong>Invalid Coordinates:</strong> Positions must be positive integers</li>
                <li><strong>File Size Exceeded:</strong> Maximum file size limit enforced</li>
                <li><strong>Encoding Error:</strong> File must be UTF-8 encoded</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaInfoCircle /> Annotation Handling</h3>
              <ul>
                <li><strong>Missing Annotations:</strong> Processed with warning flags</li>
                <li><strong>Unknown Variants:</strong> Assigned conservative risk classification</li>
                <li><strong>Partial Matches:</strong> Context-based association to known variants</li>
                <li><strong>Multiple Gene Hits:</strong> Structured prioritization logic applied</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaQuestion /> Edge Case Management</h3>
              <ul>
                <li><strong>Low Quality Variants:</strong> Flagged based on QUAL thresholds</li>
                <li><strong>Structural Variants:</strong> Handled with informative notifications</li>
                <li><strong>Incomplete Genotypes:</strong> Clearly marked in reports</li>
                <li><strong>Multi-Allelic Sites:</strong> Decomposed and analyzed individually</li>
                <li><strong>Duplicate Entries:</strong> Consolidated during processing</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>User-Focused Messaging</h3>
              <ul>
                <li>Clear, non-technical explanations</li>
                <li>Actionable correction guidance</li>
                <li>Documentation and troubleshooting references</li>
                <li>Support escalation pathways</li>
                <li>Option to proceed with non-critical warnings</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Recovery Options</h3>
              <ul>
                <li>Re-upload corrected file</li>
                <li>Download structured error report</li>
                <li>Access sample VCF reference files</li>
                <li>Pre-upload validation utility</li>
                <li>Direct support assistance</li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default ErrorHandlingPage
