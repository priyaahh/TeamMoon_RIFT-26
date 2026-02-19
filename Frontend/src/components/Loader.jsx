import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import './Loader.css'

export const Loader = ({ message = 'Processing...', fullScreen = false }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loader">
        <FaSpinner className="loader-icon" />
        <p className="loader-message">{message}</p>
        <div className="loader-bar">
          <div className="loader-bar-fill"></div>
        </div>
      </div>
    </div>
  )
}
