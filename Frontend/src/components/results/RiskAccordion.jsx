import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export const RiskAccordion = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)

    const drugName = data.drug
    const gene = data.pharmacogenomic_profile?.primary_gene
    const variant = data.pharmacogenomic_profile?.detected_variants?.[0]?.rsid || 'N/A'
    const impact = data.pharmacogenomic_profile?.detected_variants?.[0]?.impact || 'N/A'
    const recommendation = data.clinical_recommendation?.dosing || data.clinical_recommendation?.rationale

    return (
        <div className={`risk-accordion ${isOpen ? 'open' : ''}`}>
            <button
                className="accordion-header"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="accordion-title">
                    {isOpen ? '▼' : '▶'} {drugName} Details
                </span>
            </button>

            {isOpen && (
                <div className="accordion-content">
                    <div className="detail-row">
                        <span className="detail-label">Gene:</span>
                        <span className="detail-value">{gene}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Variant:</span>
                        <span className="detail-value">{variant}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Impact:</span>
                        <span className="detail-value">{impact}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Recommendation:</span>
                        <span className="detail-value">{recommendation}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
