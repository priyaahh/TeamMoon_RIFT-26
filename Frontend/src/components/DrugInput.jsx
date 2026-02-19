import React, { useState, useEffect } from 'react'
import { FaTimes, FaPlus, FaExclamationTriangle } from 'react-icons/fa'
import { validateDrugInput } from '../utils/validateVCF'
import './DrugInput.css'

const DEFAULT_DRUGS = [
  'CODEINE',
  'WARFARIN',
  'CLOPIDOGREL',
  'SIMVASTATIN',
  'AZATHIOPRINE',
  'FLUOROURACIL',
]

export const DrugInput = ({
  onDrugSelect,
  disabled = false,
  supportedDrugs = DEFAULT_DRUGS,
}) => {
  const [drugs, setDrugs] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [errors, setErrors] = useState([])
  const [warnings, setWarnings] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleAddDrug = () => {
    const trimmedValue = inputValue.trim().toUpperCase()

    if (!trimmedValue) {
      setErrors(['Please enter a drug name'])
      return
    }

    if (drugs.includes(trimmedValue)) {
      setErrors(['Drug already added'])
      setInputValue('')
      return
    }

    const newDrugs = [...drugs, trimmedValue]
    const validation = validateDrugInput(newDrugs, supportedDrugs)

    if (validation.isValid || validation.errors.length === 0) {
      setDrugs(newDrugs)
      setInputValue('')
      setErrors([])
      setWarnings(validation.warnings)
      onDrugSelect(newDrugs)
    } else {
      setErrors(validation.errors)
    }
  }

  const handleRemoveDrug = (index) => {
    const newDrugs = drugs.filter((_, i) => i !== index)
    setDrugs(newDrugs)

    if (newDrugs.length > 0) {
      const validation = validateDrugInput(newDrugs, supportedDrugs)
      setWarnings(validation.warnings)
    } else {
      setWarnings([])
      setErrors([])
    }

    onDrugSelect(newDrugs)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddDrug()
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value.trim()) {
      setShowSuggestions(true)
      setErrors([])
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (drug) => {
    // Only set input value, let user add it explicitly or auto-add? 
    // UX: Click suggestion -> Auto add is usually better.
    // Let's adapt local function to add directly.
    const trimmedValue = drug.toUpperCase()
    if (!drugs.includes(trimmedValue)) {
      const newDrugs = [...drugs, trimmedValue]
      setDrugs(newDrugs)
      onDrugSelect(newDrugs)
      setInputValue('')
      setShowSuggestions(false)
      setErrors([])
    } else {
      setInputValue('')
      setShowSuggestions(false)
    }
  }

  const getFilteredSuggestions = () => {
    const input = inputValue.trim().toUpperCase()
    // Don't show all initially, only on type
    if (!input) return []

    return supportedDrugs.filter(
      (drug) => drug.includes(input) && !drugs.includes(drug)
    )
  }

  const filteredSuggestions = getFilteredSuggestions()

  return (
    <div className="drug-input-card">
      <div className="card-header">
        <h3>Enter Drug(s)</h3>
      </div>

      <div className="input-area">
        <div className="search-wrapper">
          <input
            type="text"
            className={`drug-search-input ${errors.length > 0 ? 'error' : ''}`}
            placeholder="Search or type drug name..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => inputValue && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            disabled={disabled}
            autoComplete="off"
          />
          {inputValue && (
            <button className="btn-add-inline" onClick={handleAddDrug} disabled={disabled}>
              <FaPlus />
            </button>
          )}

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {filteredSuggestions.map((drug, index) => (
                <button
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(drug)}
                  type="button"
                >
                  {drug}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="validation-area">
        {errors.length > 0 && (
          <p className="validation-msg error">❌ {errors[0]}</p>
        )}
        {warnings.length > 0 && (
          <p className="validation-msg warning"><FaExclamationTriangle /> {warnings[0]}</p>
        )}
      </div>

      <div className="selected-drugs-area">
        {drugs.length === 0 ? (
          <p className="empty-drugs-text">No drugs selected</p>
        ) : (
          <div className="chips-container">
            {drugs.map((drug, index) => (
              <div key={index} className="drug-chip">
                <span>{drug}</span>
                <button
                  className="chip-remove"
                  onClick={() => handleRemoveDrug(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
