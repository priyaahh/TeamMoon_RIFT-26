import React from 'react'

export const VariantTable = ({ variants = [] }) => {
  if (!variants || variants.length === 0) return null

  return (
    <div className="card">
      <h3 style={{ marginBottom: '0.75rem' }}>Detected variants</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--color-text-secondary)' }}>
              <th style={{ padding: '0.5rem' }}>Gene</th>
              <th style={{ padding: '0.5rem' }}>RSID</th>
              <th style={{ padding: '0.5rem' }}>Impact</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v, idx) => (
              <tr key={idx} style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '0.5rem' }}>{v.gene || '—'}</td>
                <td style={{ padding: '0.5rem' }}>{v.rsid || v.id || '—'}</td>
                <td style={{ padding: '0.5rem' }}>{v.impact || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VariantTable

