import React, { useState } from 'react'
import { FaCopy, FaCheck, FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { formatJSON, copyToClipboard } from '../utils/formatJSON'
import './JsonViewer.css'

export const JsonViewer = ({ data, title = 'JSON Output' }) => {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(data)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!data) return null

  const jsonString = formatJSON(data)

  return (
    <div className="json-viewer card">
      <div className="json-viewer-header">
        <div className="json-viewer-title">
          <FaCode className="json-icon" />
          <h3>{title}</h3>
        </div>
        <div className="json-viewer-controls">
          <button
            className={`btn-expand ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <button
            className="btn-copy"
            onClick={handleCopy}
            type="button"
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <FaCheck /> Copied!
              </>
            ) : (
              <>
                <FaCopy /> Copy
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="json-viewer-content">
          <pre className="json-code">
            <code>{jsonString}</code>
          </pre>
        </div>
      )}

      {!isExpanded && (
        <div className="json-viewer-preview">
          <code className="json-preview">{jsonString.substring(0, 200)}...</code>
        </div>
      )}
    </div>
  )
}
