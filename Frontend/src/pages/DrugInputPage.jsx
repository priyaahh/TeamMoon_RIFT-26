import React, { useState } from 'react'

import DrugInput from '../components/drug/DrugInput'
import './FeaturePage.css'

const DrugInputPage = () => {
  return (
    <>
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

            <p style={{ marginTop: '1rem', color: '#ffffff', fontSize: '1.1rem', textAlign: 'center' }}>
              Enter input drug name or choose from the drop menu
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DrugInputPage
