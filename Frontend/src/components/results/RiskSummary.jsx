import React from 'react'
import { getRiskBadgeClass } from '../../utils/formatJSON'

export const RiskSummary = ({ results }) => {
    return (
        <div className="risk-summary-card card">
            <h3 className="card-title">Risk Summary</h3>
            <div className="risk-table-container">
                <table className="risk-table">
                    <thead>
                        <tr>
                            <th>Drug Name</th>
                            <th>Risk Label</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            const riskLabel = result.risk_assessment?.risk_label || 'Unknown'
                            const badgeClass = getRiskBadgeClass(riskLabel)

                            return (
                                <tr key={index}>
                                    <td className="drug-name">{result.drug}</td>
                                    <td>
                                        <span className={`badge ${badgeClass}`}>
                                            {riskLabel}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
