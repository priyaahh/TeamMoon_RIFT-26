import React, { useState, useRef } from 'react'
import { FaCloudUploadAlt, FaFile, FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import { validateVCFFile, MAX_FILE_SIZE } from '../utils/validateVCF'
import './FileUpload.css'

export const FileUpload = ({ onFileSelect = () => { }, disabled = false }) => {
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [fileSizePercent, setFileSizePercent] = useState(0)
  const fileInputRef = useRef(null)

  const handleFile = (selectedFile) => {
    const validation = validateVCFFile(selectedFile)

    // Calculate percentage
    const sizeMB = selectedFile.size / (1024 * 1024)
    const maxMB = MAX_FILE_SIZE / (1024 * 1024)
    setFileSizePercent(Math.min((sizeMB / maxMB) * 100, 100))

    setFile(selectedFile)
    setErrors(validation.errors)

    if (validation.isValid) {
      onFileSelect(selectedFile)
    } else {
      onFileSelect(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (disabled) return
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleInputChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }

  const clearFile = (e) => {
    e.stopPropagation()
    setFile(null)
    setErrors([])
    setFileSizePercent(0)
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  // Determine container class based on state
  let containerClass = "upload-card"
  if (isDragging) containerClass += " dragging"
  if (disabled) containerClass += " disabled"
  if (errors.length > 0) containerClass += " error"
  else if (file) containerClass += " success"

  return (
    <div className={containerClass} onClick={triggerFileInput}>
      <div className="upload-content">
        {!file ? (
          <>
            <div className="upload-icon-wrapper">
              <FaCloudUploadAlt className="upload-icon" />
            </div>
            <div className="upload-text">
              <p className="primary-text">Drag & Drop VCF File</p>
              <p className="secondary-text">or click to browse</p>
            </div>
            {errors.length > 0 && (
              <div className="validation-message error">
                <FaExclamationCircle />
                <span>{errors[0]}</span>
              </div>
            )}
            <p className="file-hint">Max file size: {MAX_FILE_SIZE / (1024 * 1024)} MB</p>
          </>
        ) : (
          <div className="file-preview">
            <div className="file-icon-wrapper">
              <FaFile className="file-icon" />
            </div>
            <div className="file-details">
              <p className="file-name">{file.name}</p>

              <div className="file-progress">
                <div
                  className={`progress-bar ${errors.length > 0 && file.size > MAX_FILE_SIZE ? 'over' : ''}`}
                  style={{ width: `${fileSizePercent}%` }}
                />
              </div>

              <p className="file-size">
                {(file.size / (1024 * 1024)).toFixed(2)} MB / {MAX_FILE_SIZE / (1024 * 1024)} MB
              </p>

              {errors.length > 0 && (
                <div className="validation-message error" style={{ justifyContent: 'flex-start', marginTop: '8px' }}>
                  <FaExclamationCircle />
                  <span className="error-text">{errors[0]}</span>
                </div>
              )}
            </div>
            <div className="validation-status">
              {errors.length > 0 ? (
                <FaExclamationCircle className="error-icon" style={{ color: '#ef4444' }} />
              ) : (
                <FaCheckCircle className="check-icon" />
              )}
            </div>
            <button
              className="btn-remove"
              onClick={clearFile}
              title="Remove file"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".vcf,.vcf.gz"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
    </div>
  )
}
