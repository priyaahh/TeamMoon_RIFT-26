import React from 'react'

export const ConfidenceBar = ({ score }) => {
    // Score is expected to be 0-1
    const percent = Math.round((score || 0) * 100)

    // Color gradient based on score
    let color = '#ef4444' // Low confidence (Red)
    if (percent > 70) color = '#10b981' // High (Green)
    else if (percent > 40) color = '#f59e0b' // Medium (Yellow)

    return (
        <div className="confidence-container">
            <div className="confidence-header">
                <span className="confidence-label">AI Confidence</span>
                <span className="confidence-value">{percent}%</span>
            </div>
            <div className="confidence-track">
                <div
                    className="confidence-fill"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                />
            </div>
        </div>
    )
}

export default ConfidenceBar
