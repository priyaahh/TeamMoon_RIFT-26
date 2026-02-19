import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaDna } from 'react-icons/fa'
import { RiskGauge } from './RiskGauge'
import { ConfidenceBar } from './ConfidenceBar'

export const DrugCard = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)

    const drugName = data.drug || 'Unknown Drug'
    const riskLabel = data.risk_assessment?.risk_label || 'Unknown'
    const confidence = data.risk_assessment?.confidence_score || 0

    const gene = data.pharmacogenomic_profile?.primary_gene || 'N/A'
    const phenotype = data.pharmacogenomic_profile?.phenotype || 'N/A'
    const recommendation = data.clinical_recommendation?.recommendation ||
        data.clinical_recommendation?.dosing ||
        'No specific recommendation provided.'

    return (
        <div className="drug-card">
            <div className="card-header">
                <div className="drug-name">{drugName}</div>
                <div className={`risk-badge badge-${riskLabel.toLowerCase().split(' ')[0]}`}>
                    {riskLabel}
                </div>
                {/* Simple logic for badge color handled by CSS classes or inline style if needed explicitly */}
            </div>

            <div className="card-grid">
                {/* Left Column: Visuals */}
                <div className="data-column">
                    <RiskGauge riskLevel={riskLabel} />
                    <ConfidenceBar score={confidence} />
                </div>

                {/* Right Column: Key Data */}
                <div className="data-column">
                    <div>
                        <div className="detail-label">Primary Gene</div>
                        <div className="key-genes-list">
                            <span className="gene-tag"><FaDna /> {gene}</span>
                        </div>
                    </div>
                    <div>
                        <div className="detail-label">Phenotype</div>
                        <div className="detail-value" style={{ textAlign: 'left' }}>{phenotype}</div>
                    </div>
                </div>
            </div>

            <button
                className="details-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Hide Clinical Details' : 'View Clinical Details'}
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {isOpen && (
                <div className="details-content">
                    <div className="detail-row">
                        <span className="detail-label">Recommendation</span>
                        <span className="detail-value">{recommendation}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Diplotype</span>
                        <span className="detail-value">{data.pharmacogenomic_profile?.diplotype || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Implication</span>
                        <span className="detail-value">{data.clinical_recommendation?.implication || 'N/A'}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DrugCard
