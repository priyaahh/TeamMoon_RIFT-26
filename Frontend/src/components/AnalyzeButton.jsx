import React from 'react'
import { FaDna, FaSpinner } from 'react-icons/fa'
import './AnalyzeButton.css'

export const AnalyzeButton = ({ onClick, disabled, isLoading }) => {
    return (
        <button
            className={`analyze-btn ${isLoading ? 'loading' : ''}`}
            onClick={onClick}
            disabled={disabled || isLoading}
            aria-label="Analyze Genetic Risk"
        >
            {isLoading ? (
                <>
                    <FaSpinner className="animate-spin" />
                    <span>Processing...</span>
                </>
            ) : (
                <>
                    <FaDna />
                    <span>Analyze Genetic Risk</span>
                </>
            )}
        </button>
    )
}
