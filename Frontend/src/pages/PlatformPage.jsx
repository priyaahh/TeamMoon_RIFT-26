import React, { useEffect, useMemo, useState } from 'react'
import Footer from '../components/layout/Footer'
import { FileUpload } from '../components/FileUpload'
import { DrugInput } from '../components/DrugInput'
import { AnalyzeButton } from '../components/AnalyzeButton'
import { ResultsPanel } from '../components/results/ResultsPanel'
import { ErrorAlert } from '../components/common/ErrorAlert'
import { analyzePharmacogenomics, getSupportedDrugs } from '../utils/api'
import { FaDna } from 'react-icons/fa'
import './PlatformPage.css'

const PlatformPage = () => {
  const [vcfFile, setVcfFile] = useState(null)
  const [drugs, setDrugs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)
  const [supportedDrugs, setSupportedDrugs] = useState([])

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const drugList = await getSupportedDrugs()
        if (Array.isArray(drugList) && drugList.length > 0) {
          setSupportedDrugs(drugList)
        }
      } catch (err) {
        console.error('Failed to fetch drugs:', err)
      }
    }
    fetchDrugs()
  }, [])

  const canAnalyze = useMemo(
    () => Boolean(vcfFile) && drugs.length > 0,
    [vcfFile, drugs]
  )

  const handleAnalyze = async () => {
    if (!vcfFile) {
      setError({
        title: 'VCF File Required',
        message: 'Please upload a VCF file to proceed.',
        type: 'error',
      })
      return
    }

    if (drugs.length === 0) {
      setError({
        title: 'Drug Selection Required',
        message: 'Please select at least one drug for analysis.',
        type: 'error',
      })
      return
    }

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const allResults = []

      for (const drug of drugs) {
        const result = await analyzePharmacogenomics(vcfFile, drug)
        allResults.push(result)
      }

      setResults(allResults)
    } catch (err) {
      setError({
        title: 'Analysis Failed',
        message: err.message || 'Failed to analyze pharmacogenomics.',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>

      <div className="platform-page">
        <div className="platform-container">

          <div className="platform-header">
            <h1 className="platform-title">
              Pharmacogenomic Risk Analysis
            </h1>
            <p className="platform-subtitle">
              Upload genomic data and select medications for personalized risk assessment.
            </p>
          </div>

          <div className="platform-grid">

            {/* INPUT COLUMN */}
            <section className="input-section">
              <FileUpload
                onFileSelect={setVcfFile}
                disabled={isLoading}
              />

              <DrugInput
                onDrugSelect={setDrugs}
                disabled={isLoading}
                supportedDrugs={
                  supportedDrugs.length > 0 ? supportedDrugs : undefined
                }
              />

              <div className="action-area">
                <AnalyzeButton
                  onClick={handleAnalyze}
                  disabled={!canAnalyze}
                  isLoading={isLoading}
                />

                {error && (
                  <div style={{ marginTop: '1rem' }}>
                    <ErrorAlert
                      title={error.title}
                      message={error.message}
                      type={error.type}
                      onClose={() => setError(null)}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* RESULTS COLUMN */}
            <section className="results-section">
              {isLoading ? (
                <div className="loading-container">
                  <div
                    className="animate-spin"
                    style={{
                      fontSize: '3rem',
                      color: 'var(--color-primary-500)',
                    }}
                  >
                    <FaDna />
                  </div>
                  <p className="loading-text">
                    Analyzing genetic variants...
                  </p>
                </div>
              ) : results ? (
                <ResultsPanel results={results} />
              ) : (
                <div className="results-placeholder">
                  <FaDna className="placeholder-icon" />
                  <h3>Ready to Analyze</h3>
                  <p>
                    Upload a VCF file and select medications to view your
                    personalized pharmacogenomic risk assessment.
                  </p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default PlatformPage
