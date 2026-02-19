import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import DrugInput from '../components/drug/DrugInput'
import './FeaturePage.css'

const DrugInputPage = () => {
  return (
    <>
      <Navbar />
      <div className="feature-page">
        <div className="feature-page-header">
          <h1>Select Medications</h1>
          <p>Search and select drugs for pharmacogenomic interaction analysis</p>
        </div>
        
        <div className="feature-page-content">
          <div className="feature-section">
            <h2>Drug Input Interface</h2>
            <div className="feature-box">
              <DrugInput />
            </div>
            
            <div className="info-section">
              <h3>How to Use</h3>
              <ul>
                <li>Start typing drug name in the input field</li>
                <li>Select from the dropdown suggestions</li>
                <li>Multiple drugs can be added for comprehensive analysis</li>
                <li>Each drug will be analyzed for genetic interactions</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Drug Database</h3>
              <ul>
                <li><strong>Source:</strong> Clinical Pharmacogenetics Implementation Consortium (CPIC)</li>
                <li><strong>Coverage:</strong> 300+ FDA-approved medications</li>
                <li><strong>Updates:</strong> Regular updates with latest pharmacogenomic guidelines</li>
                <li><strong>Validation:</strong> All drugs validated against CPIC standards</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>What Gets Analyzed</h3>
              <ol>
                <li>Patient's genetic variants</li>
                <li>Drug metabolism pathways (CYP450, Phase II enzymes)</li>
                <li>Known drug-gene associations</li>
                <li>Risk prediction based on genotype-phenotype mapping</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DrugInputPage
