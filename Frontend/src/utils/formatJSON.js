/**
 * JSON Formatting and Display Utilities
 */

/**
 * Format JSON object for display with syntax highlighting
 * @param {Object} obj - Object to format
 * @param {number} indent - Indentation level
 * @returns {string} Formatted JSON string
 */
export const formatJSON = (obj, indent = 2) => {
  return JSON.stringify(obj, null, indent)
}

/**
 * Get risk level color based on assessment
 * @param {string} riskLabel - Risk label (Safe, Adjust Dosage, Toxic, Ineffective, Unknown)
 * @returns {string} Color name
 */
export const getRiskColor = (riskLabel) => {
  const riskMap = {
    safe: 'var(--color-safe)',
    'adjust dosage': 'var(--color-adjust)',
    'adjust doses': 'var(--color-adjust)',
    toxic: 'var(--color-toxic)',
    ineffective: 'var(--color-ineffective)',
    unknown: 'var(--color-unknown)',
  }

  const label = riskLabel?.toLowerCase() || ''
  return riskMap[label] || 'var(--color-unknown)'
}

/**
 * Get risk level badge class
 * @param {string} riskLabel - Risk label
 * @returns {string} Badge class name
 */
export const getRiskBadgeClass = (riskLabel) => {
  const label = riskLabel?.toLowerCase() || 'unknown'
  
  if (label.includes('safe')) return 'badge-safe'
  if (label.includes('adjust')) return 'badge-adjust'
  if (label.includes('toxic')) return 'badge-toxic'
  if (label.includes('ineffective')) return 'badge-ineffective'
  return 'badge-unknown'
}

/**
 * Format confidence score as percentage
 * @param {number} score - Score between 0 and 1
 * @returns {string} Formatted percentage
 */
export const formatConfidence = (score) => {
  if (typeof score !== 'number') return 'N/A'
  return `${Math.round(score * 100)}%`
}

/**
 * Format severity level
 * @param {string} severity - Severity (none, low, moderate, high, critical)
 * @returns {string} Formatted severity with icon
 */
export const formatSeverity = (severity) => {
  const severityMap = {
    none: '🟢 None',
    low: '🟡 Low',
    moderate: '🟠 Moderate',
    high: '🔴 High',
    critical: '🔴 Critical',
  }
  return severityMap[severity?.toLowerCase()] || 'Unknown'
}

/**
 * Format phenotype description
 * @param {string} phenotype - Phenotype code (PM, IM, NM, RM, URM, Unknown)
 * @returns {Object} Phenotype with description
 */
export const formatPhenotype = (phenotype) => {
  const phenotypeMap = {
    PM: {
      short: 'PM',
      full: 'Poor Metabolizer',
      description:
        'Slow metabolism; may require dose reduction or alternative medication',
    },
    IM: {
      short: 'IM',
      full: 'Intermediate Metabolizer',
      description:
        'Moderately reduced metabolism; dose adjustment may be needed',
    },
    NM: {
      short: 'NM',
      full: 'Normal Metabolizer',
      description:
        'Normal metabolism; standard dosing typically recommended',
    },
    RM: {
      short: 'RM',
      full: 'Rapid Metabolizer',
      description:
        'Fast metabolism; may require higher dose or more frequent dosing',
    },
    URM: {
      short: 'URM',
      full: 'Ultra-Rapid Metabolizer',
      description:
        'Very fast metabolism; may require significantly higher doses',
    },
  }

  const code = phenotype?.toUpperCase() || 'UNKNOWN'
  return (
    phenotypeMap[code] || {
      short: 'Unknown',
      full: 'Unknown Phenotype',
      description: 'Unable to determine metabolizer phenotype',
    }
  )
}

/**
 * Format date and time
 * @param {string} timestamp - ISO 8601 timestamp
 * @returns {string} Formatted date and time
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A'
  try {
    return new Date(timestamp).toLocaleString()
  } catch {
    return timestamp
  }
}

/**
 * Extract and format detected variants
 * @param {Array} variants - Variant array from API
 * @returns {Array} Formatted variants
 */
export const formatVariants = (variants) => {
  if (!Array.isArray(variants)) return []

  return variants.map((variant) => ({
    ...variant,
    displayName: `${variant.gene || 'Unknown'}: ${variant.rsid || variant.id || 'N/A'}`,
  }))
}

/**
 * Generate downloadable JSON content
 * @param {Object} data - Data to download
 * @param {string} filename - Filename for download
 */
export const downloadJSON = (data, filename = 'pharmacogenomics_result.json') => {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2))
  )
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

/**
 * Copy JSON to clipboard
 * @param {Object} data - Data to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (data) => {
  try {
    const jsonString = JSON.stringify(data, null, 2)
    await navigator.clipboard.writeText(jsonString)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * Validate JSON against schema
 * @param {Object} data - Data to validate
 * @param {Object} schema - Schema to validate against
 * @returns {Object} Validation result
 */
export const validateAgainstSchema = (data, schema) => {
  const errors = []
  const warnings = []

  // Check required fields
  const requiredFields = [
    'patient_id',
    'drug',
    'timestamp',
    'risk_assessment',
    'pharmacogenomic_profile',
  ]

  for (const field of requiredFields) {
    if (!data.hasOwnProperty(field)) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  // Check nested structures
  if (data.risk_assessment) {
    const requiredRiskFields = ['risk_label', 'confidence_score', 'severity']
    for (const field of requiredRiskFields) {
      if (!data.risk_assessment.hasOwnProperty(field)) {
        errors.push(`Missing risk_assessment field: ${field}`)
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * High light JSON syntax for display
 * @param {string} jsonString - JSON string to highlight
 * @returns {string} HTML with syntax highlighting
 */
export const highlightJSON = (jsonString) => {
  return jsonString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'number'
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key'
          } else {
            cls = 'string'
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean'
        } else if (/null/.test(match)) {
          cls = 'null'
        }
        return `<span class="json-${cls}">${match}</span>`
      }
    )
}
