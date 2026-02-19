import React from 'react'
import { FaTimes } from 'react-icons/fa'

export const DrugChip = ({ label, onRemove, removable = true }) => {
  return (
    <div className="drug-tag">
      <span>{label}</span>
      {removable && (
        <button className="btn-remove-drug" onClick={onRemove} type="button" title="Remove drug">
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default DrugChip

