/**
 * VCF File Validation
 * Validates VCF file format, size, and structure
 */

export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB

/**
 * Validates VCF file format and size
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
export const validateVCFFile = (file) => {
  const errors = []
  const warnings = []

  // Check file extension
  const isValidType = file.name.toLowerCase().endsWith('.vcf') || file.name.toLowerCase().endsWith('.vcf.gz');
  if (!isValidType) {
    errors.push('Invalid file type. Please upload a .vcf or .vcf.gz file.')
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File too large. Max allowed size is ${MAX_FILE_SIZE / 1024 / 1024} MB.`)
  }

  if (file.size === 0) {
    errors.push('File is empty')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    fileInfo: {
      name: file.name,
      size: file.size,
      sizeInMB: (file.size / 1024 / 1024).toFixed(2),
      type: file.type,
      lastModified: new Date(file.lastModified).toLocaleString(),
    },
  }
}

/**
 * Parses VCF file content (basic validation)
 * @param {string} content - VCF file content
 * @returns {Object} Parsed VCF data
 */
export const parseVCFContent = (content) => {
  const lines = content.split('\n')
  const headers = []
  const variants = []
  let headerEndIndex = -1

  // Parse headers
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line.startsWith('##')) {
      headers.push(line)
    } else if (line.startsWith('#CHROM')) {
      headerEndIndex = i
      break
    }
  }

  // Parse variants (data lines)
  if (headerEndIndex !== -1) {
    for (let i = headerEndIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line && !line.startsWith('#')) {
        const fields = line.split('\t')
        if (fields.length >= 8) {
          variants.push({
            chromosome: fields[0],
            position: fields[1],
            id: fields[2],
            reference: fields[3],
            alternate: fields[4],
            quality: fields[5],
            filter: fields[6],
            info: fields[7],
          })
        }
      }
    }
  }

  return {
    headerCount: headers.length,
    variantCount: variants.length,
    headers,
    variants: variants.slice(0, 100), // Return first 100 variants
    totalVariants: variants.length,
  }
}

/**
 * Validates drug names
 * @param {string|string[]} drugs - Drug name(s) to validate
 * @param {string[]} supportedDrugs - List of supported drugs
 * @returns {Object} Validation result
 */
export const validateDrugInput = (drugs, supportedDrugs = []) => {
  const errors = []
  const warnings = []
  let drugList = drugs

  // Parse drug input
  if (typeof drugs === 'string') {
    drugList = drugs.split(',').map((d) => d.trim().toUpperCase())
  } else if (Array.isArray(drugs)) {
    drugList = drugs.map((d) => d.toString().trim().toUpperCase())
  }

  // Filter out empty strings
  drugList = drugList.filter((d) => d.length > 0)

  if (drugList.length === 0) {
    errors.push('Please enter at least one drug name')
  }

  if (drugList.length > 10) {
    warnings.push('Analyzing more than 10 drugs may take longer')
  }

  // Validate against supported drugs if provided
  if (supportedDrugs.length > 0) {
    const unsupported = drugList.filter(
      (drug) => !supportedDrugs.includes(drug.toUpperCase())
    )
    if (unsupported.length > 0) {
      warnings.push(
        `Unknown drugs: ${unsupported.join(', ')}. Results may be limited.`
      )
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    drugs: drugList,
    drugCount: drugList.length,
  }
}

/**
 * Generates file summary
 * @param {File} file - File to summarize
 * @returns {string} File summary
 */
export const generateFileSummary = (file) => {
  return `
    File: ${file.name}
    Size: ${(file.size / 1024).toFixed(2)} KB
    Type: ${file.type || 'Unknown'}
    Modified: ${new Date(file.lastModified).toLocaleString()}
  `.trim()
}
