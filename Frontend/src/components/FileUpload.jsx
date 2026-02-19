import React, { useState, useRef } from 'react'
import { FaCloudUploadAlt, FaFile, FaTimes } from 'react-icons/fa'
import { validateVCFFile } from '../utils/validateVCF'
import './FileUpload.css'

export const FileUpload = ({ onFileSelect, disabled = false }) => {
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (selectedFile) => {
    const validation = validateVCFFile(selectedFile)

    if (validation.isValid) {
      setFile(selectedFile)
      setErrors([])
      onFileSelect(selectedFile)
    } else {
      setErrors(validation.errors)
      setFile(null)
      onFileSelect(null)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFile(droppedFile)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
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

  const clearFile = () => {
    setFile(null)
    setErrors([])
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="file-upload">
      <label className="upload-label">Upload VCF File</label>

      {!file ? (
        <div
          className={`upload-zone ${isDragging ? 'dragging' : ''} ${
            disabled ? 'disabled' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFileInput}
        >
          <FaCloudUploadAlt className="upload-icon" />
          <p className="upload-title">Drag & Drop Your VCF File</p>
          <p className="upload-subtitle">or click to browse</p>
          <p className="upload-hint">Maximum file size: 5 MB</p>
        </div>
      ) : (
        <div className="file-info">
          <div className="file-header">
            <FaFile className="file-icon" />
            <div className="file-details">
              <p className="file-name">{file.name}</p>
              <p className="file-size">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              className="btn-clear"
              onClick={clearFile}
              title="Clear file"
              type="button"
            >
              <FaTimes />
            </button>
          </div>
          <div className="file-status">
            <span className="status-badge success">✓ Valid VCF File</span>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".vcf"
        onChange={handleInputChange}
        style={{ display: 'none' }}
        disabled={disabled}
        aria-label="Upload VCF file"
      />

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error-text">
              ❌ {error}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
