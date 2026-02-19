import React, { useState, useEffect } from 'react'
import { FaTimes, FaPlus } from 'react-icons/fa'
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
    setInputValue(drug)
    setShowSuggestions(false)
  }

  const getFilteredSuggestions = () => {
    const input = inputValue.trim().toUpperCase()
    if (!input) return supportedDrugs

    return supportedDrugs.filter(
      (drug) => drug.includes(input) && !drugs.includes(drug)
    )
  }

  const filteredSuggestions = getFilteredSuggestions()

  return (
    <div className="drug-input">
      <label className="input-label">Enter Drug Name(s)</label>

      <div className="drug-input-container">
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Type drug name and press Enter or click +"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => inputValue && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            disabled={disabled}
            aria-label="Drug name input"
            autoComplete="off"
          />

          <button
            className="btn btn-primary btn-add-drug"
            onClick={handleAddDrug}
            disabled={disabled}
            type="button"
            title="Add drug"
          >
            <FaPlus /> Add
          </button>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="suggestions-list">
            {filteredSuggestions.slice(0, 6).map((drug, index) => (
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

      {drugs.length > 0 && (
        <div className="drugs-list">
          <label className="drugs-label">
            Selected Drugs ({drugs.length})
          </label>
          <div className="drugs-tags">
            {drugs.map((drug, index) => (
              <div key={index} className="drug-tag">
                <span>{drug}</span>
                <button
                  className="btn-remove-drug"
                  onClick={() => handleRemoveDrug(index)}
                  type="button"
                  title="Remove drug"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {errors.length > 0 && (
        <div className="validation-messages error">
          {errors.map((error, index) => (
            <p key={index} className="message-text">
              ❌ {error}
            </p>
          ))}
        </div>
      )}

      {warnings.length > 0 && (
        <div className="validation-messages warning">
          {warnings.map((warning, index) => (
            <p key={index} className="message-text">
              ⚠️ {warning}
            </p>
          ))}
        </div>
      )}

      <div className="info-box">
        <p className="info-label">💡 Supported Drugs:</p>
        <div className="supported-drugs">
          {supportedDrugs.map((drug, index) => (
            <span key={index} className="drug-badge">
              {drug}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
