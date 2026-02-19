import React from 'react'

import FileUpload from '../components/upload/VCFUpload'
import './FeaturePage.css'

const VcfUploadPage = () => {
  const [selectedFile, setSelectedFile] = React.useState(null)

  const handleFileSelect = (file) => {
    setSelectedFile(file)
  }

  const handleProcess = () => {
    if (selectedFile) {
      alert(`Processing ${selectedFile.name}...`)
      // Add actual processing logic here later
    }
  }

  return (
    <>
      <div className="feature-page">
        <div className="feature-page-header">
          <h1>Upload Genomic Data</h1>
          <p>Securely upload your VCF (Variant Call Format) file for pharmacogenomic analysis</p>
        </div>

        <div className="feature-page-content">
          <div className="feature-section">
            <h2>VCF File Upload</h2>
            <div className="feature-box">
              <FileUpload onFileSelect={handleFileSelect} />
              <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}>
                Make sure your file is in .vcf or .vcf.gz format and does not exceed 50 MB.
              </p>
            </div>

            {selectedFile && (
              <div className="process-action" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <button
                  className="btn-book"
                  onClick={handleProcess}
                  style={{
                    fontSize: '1.1rem',
                    padding: '0.8rem 2rem',
                    background: 'var(--color-primary-600)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Proceed to Analysis
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default VcfUploadPage
