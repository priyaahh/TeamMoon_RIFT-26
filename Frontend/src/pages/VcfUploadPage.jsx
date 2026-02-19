import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import FileUpload from '../components/upload/VCFUpload'
import './FeaturePage.css'

const VcfUploadPage = () => {
  return (
    <>
      <Navbar />
      <div className="feature-page">
        <div className="feature-page-header">
          <h1>Upload Genomic Data</h1>
          <p>Securely upload your VCF (Variant Call Format) file for pharmacogenomic analysis</p>
        </div>
        
        <div className="feature-page-content">
          <div className="feature-section">
            <h2>VCF File Upload</h2>
            <div className="feature-box">
              <FileUpload />
            </div>
            
            <div className="info-section">
              <h3>Supported File Formats</h3>
              <ul>
                <li><strong>VCF (Variant Call Format):</strong> Standard format for genomic variant data</li>
                <li><strong>Compression:</strong> Both .vcf and .vcf.gz are supported</li>
                <li><strong>Max Size:</strong> Up to 100MB per file</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>File Requirements</h3>
              <ul>
                <li>Must contain valid VCF header with ##fileformat=VCFv4.0 or higher</li>
                <li>Required columns: CHROM, POS, ID, REF, ALT, QUAL, FILTER, INFO</li>
                <li>Chromosome notation: chr1-chr22, chrX, chrY (or 1-22, X, Y)</li>
                <li>Position in 1-based coordinates (VCF standard)</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>What Happens Next</h3>
              <ol>
                <li>Your file is validated for proper VCF format</li>
                <li>Variants are extracted and classified</li>
                <li>Select medications for drug-gene interaction analysis</li>
                <li>AI generates personalized risk predictions</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default VcfUploadPage
