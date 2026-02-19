import React from 'react'
import { FaDownload, FaCopy } from 'react-icons/fa'
import { DrugCard } from './DrugCard'
import { downloadJSON, copyToClipboard } from '../../../utils/formatJSON'
import './RiskVisualizer.css'

export const RiskVisualizer = ({ results }) => {
    if (!results) return null

    const resultsArray = Array.isArray(results) ? results : [results]

    const handleCopy = () => {
        copyToClipboard(resultsArray)
        alert('Results copied to clipboard!')
    }

    const handleDownload = () => {
        downloadJSON(resultsArray, 'pharmaguard_results.json')
    }

    return (
        <div className="risk-visualizer animate-fade-in">
            <div className="visualizer-header">
                <div className="visualizer-title">Pharmacogenomic Analysis</div>
                <div className="visualizer-actions">
                    <button className="action-btn" onClick={handleCopy}>
                        <FaCopy /> Copy
                    </button>
                    <button className="action-btn" onClick={handleDownload}>
                        <FaDownload /> Download JSON
                    </button>
                </div>
            </div>

            {resultsArray.map((result, index) => (
                <DrugCard key={index} data={result} />
            ))}
        </div>
    )
}

export default RiskVisualizer
