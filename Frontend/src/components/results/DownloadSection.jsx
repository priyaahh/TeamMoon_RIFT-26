import React, { useState } from 'react'
import { FaDownload, FaCopy, FaCheck } from 'react-icons/fa'
import { downloadJSON, copyToClipboard } from '../../utils/formatJSON'

export const DownloadSection = ({ data }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const success = await copyToClipboard(data)
        if (success) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleDownload = () => {
        downloadJSON(data, `pharmacogenomix_results.json`)
    }

    return (
        <div className="download-section">
            <button className="btn btn-secondary btn-action" onClick={handleDownload}>
                <FaDownload /> Download JSON
            </button>
            <button className="btn btn-secondary btn-action" onClick={handleCopy}>
                {copied ? <FaCheck /> : <FaCopy />} Copy to Clipboard
            </button>
        </div>
    )
}
