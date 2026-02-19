import React from 'react'
import RiskVisualizer from './visualizer/RiskVisualizer'
import { DownloadSection } from './DownloadSection'
import './ResultsPanel.css'

export const ResultsPanel = ({ results }) => {
    if (!results) return null

    // Ensure results is an array for multiple drugs, or single object
    const resultsArray = Array.isArray(results) ? results : [results]
    // Ideally, if multiple, we might want to tab/select them, but for now let's stack them or just show the first/selected
    // The user spec implies a summary of drugs.
    // "Risk Summary Card... Drug Name | Risk Label" - this implies a table for multiple.

    // Let's handle the single result case primarily as per the current flow, 
    // but if there are multiple, we'll show the summary table for all.

    return (
        <div className="results-panel animate-slide-up">
            <RiskVisualizer results={resultsArray} />

            <div className="results-divider"></div>

            <DownloadSection data={results} />
        </div>
    )
}
