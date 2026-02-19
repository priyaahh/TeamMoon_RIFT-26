import React from 'react'

export const RiskGauge = ({ riskLevel }) => {
    const level = riskLevel?.toLowerCase() || 'unknown'

    // Determine color and rotation/width based on risk
    let color = 'var(--color-unknown)'
    let width = '0%'

    if (level.includes('safe')) {
        color = 'var(--color-safe)' // Green
        width = '33%'
    } else if (level.includes('adjust')) {
        color = 'var(--color-adjust)' // Yellow
        width = '66%'
    } else if (level.includes('toxic') || level.includes('ineffective') || level.includes('high')) {
        color = 'var(--color-toxic)' // Red
        width = '100%'
    }

    return (
        <div className="risk-gauge-container">
            <div className="risk-gauge-track">
                <div
                    className="risk-gauge-fill"
                    style={{ width: width, backgroundColor: color }}
                />
            </div>
            <div className="risk-label" style={{ color: color }}>
                {riskLevel || 'Unknown'}
            </div>
        </div>
    )
}

export default RiskGauge
