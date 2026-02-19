import React from 'react'
import { FaTimes, FaExclamationCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'
import './ErrorMessage.css'

export const ErrorMessage = ({
  message,
  type = 'error',
  onClose,
  title,
  details,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <FaExclamationCircle />
      case 'success':
        return <FaCheckCircle />
      case 'info':
        return <FaInfoCircle />
      default:
        return <FaExclamationCircle />
    }
  }

  return (
    <div className={`error-message ${type}`}>
      <div className="error-header">
        <span className="error-icon">{getIcon()}</span>
        {title && <h4 className="error-title">{title}</h4>}
      </div>

      <p className="error-text">{message}</p>

      {details && <div className="error-details">{details}</div>}

      {onClose && (
        <button className="btn-close" onClick={onClose} type="button">
          <FaTimes />
        </button>
      )}
    </div>
  )
}
