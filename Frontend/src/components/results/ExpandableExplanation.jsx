import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export const ExpandableExplanation = ({ title = 'AI Explanation', children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="card">
      <button
        className="section-header"
        onClick={() => setOpen((v) => !v)}
        type="button"
        style={{ padding: 0, borderLeftColor: 'transparent' }}
      >
        <span className="section-title">🤖 {title}</span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {open && <div style={{ marginTop: '1rem' }}>{children}</div>}
    </div>
  )
}

export default ExpandableExplanation

