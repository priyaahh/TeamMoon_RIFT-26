import React from 'react'

export const FileValidationMessage = ({ errors = [], warnings = [] }) => {
  if ((!errors || errors.length === 0) && (!warnings || warnings.length === 0)) return null

  return (
    <div className="validation-messages">
      {errors?.map((msg, idx) => (
        <p key={`e-${idx}`} className="message-text">
          ❌ {msg}
        </p>
      ))}
      {warnings?.map((msg, idx) => (
        <p key={`w-${idx}`} className="message-text">
          ⚠️ {msg}
        </p>
      ))}
    </div>
  )
}

export default FileValidationMessage

