import React from 'react'
import { getRiskBadgeClass } from '../../utils/formatJSON'

export const RiskBadge = ({ riskLabel }) => {
  const cls = getRiskBadgeClass(riskLabel)
  return <span className={`badge ${cls}`}>{riskLabel || 'Unknown'}</span>
}

export default RiskBadge

