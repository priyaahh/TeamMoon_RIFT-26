import React, { useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa'
import { copyToClipboard } from '../../utils/formatJSON'

export const CopySummary = ({ data, label = 'Copy JSON' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(data)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button className="btn btn-secondary" type="button" onClick={handleCopy}>
      {copied ? (
        <>
          <FaCheck /> Copied
        </>
      ) : (
        <>
          <FaCopy /> {label}
        </>
      )}
    </button>
  )
}

export default CopySummary

