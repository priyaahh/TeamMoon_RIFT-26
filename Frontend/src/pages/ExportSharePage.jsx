import React from 'react'
import { FaFileDownload, FaCopy } from 'react-icons/fa'
import './FeaturePage.css'

// Strict JSON Schema Mock Data
const mockData = {
    "patient_id": "PATIENT_001",
    "drug": "WARFARIN",
    "timestamp": new Date().toISOString(),
    "risk_assessment": {
        "risk_label": "Adjust Dosage",
        "confidence_score": 0.95,
        "severity": "moderate"
    },
    "pharmacogenomic_profile": {
        "primary_gene": "CYP2C9",
        "diplotype": "*2/*3",
        "phenotype": "Poor Metabolizer",
        "detected_variants": [
            {
                "rsid": "rs1799853",
                "genotype": "CT"
            },
            {
                "rsid": "rs1057910",
                "genotype": "AC"
            }
        ]
    },
    "clinical_recommendation": {
        "recommendation": "Consider a 50% reduction in starting dose due to reduced enzyme activity. Monitor INR closely.",
        "guideline_source": "CPIC"
    },
    "llm_generated_explanation": {
        "summary": "The patient carries variants in CYP2C9 that significantly reduce enzyme activity, increasing the risk of bleeding with standard Warfarin dosing."
    },
    "quality_metrics": {
        "vcf_parsing_success": true,
        "variant_coverage": 0.99
    }
}

const ExportSharePage = () => {
    return (
        <div className="feature-page">
            <div className="feature-page-header">
                <h1>Export & Share</h1>
                <p>Download or copy the raw analysis data for further use.</p>
            </div>

            <div className="feature-page-content">
                <div className="feature-section">
                    {/* JSON Download & Copy Card */}
                    <div className="feature-box">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <FaFileDownload style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }} />
                            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Export Data</h2>
                        </div>
                        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
                            Download your complete analysis results in JSON format or copy to clipboard.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <button
                                style={{
                                    width: 'auto',
                                    minWidth: '200px',
                                    justifyContent: 'center',
                                    background: 'var(--color-primary-600)',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    border: 'none',
                                    borderRadius: '9999px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Download .json
                            </button>
                            <div style={{
                                width: '100%',
                                background: '#1e293b',
                                borderRadius: '8px',
                                padding: '1.5rem',
                                border: '1px solid #334155',
                                overflow: 'hidden',
                                marginTop: '1rem',
                                position: 'relative'
                            }}>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(JSON.stringify(mockData, null, 2))
                                        alert('Copied to clipboard!')
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        borderRadius: '4px',
                                        padding: '0.4rem 0.8rem',
                                        color: '#e2e8f0',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}
                                    title="Copy to clipboard"
                                >
                                    <FaCopy /> Copy
                                </button>
                                <pre style={{
                                    margin: 0,
                                    color: '#94a3b8',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9rem',
                                    overflowX: 'auto'
                                }}>
                                    {JSON.stringify(mockData, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExportSharePage
