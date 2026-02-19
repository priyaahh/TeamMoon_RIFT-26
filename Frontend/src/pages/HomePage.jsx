import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VCFUpload } from '../components/upload/VCFUpload'
import { DrugInput } from '../components/drug/DrugInput'
import { Loader } from '../components/common/Loader'
import { ErrorAlert } from '../components/common/ErrorAlert'
import { analyzePharmacogenomics, getSupportedDrugs } from '../utils/api'
import { saveResults } from '../utils/resultsStore'

export const HomePage = () => {
  const navigate = useNavigate()
  const [vcfFile, setVcfFile] = useState(null)
  const [drugs, setDrugs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [supportedDrugs, setSupportedDrugs] = useState([
    'CODEINE',
    'WARFARIN',
    'CLOPIDOGREL',
    'SIMVASTATIN',
    'AZATHIOPRINE',
    'FLUOROURACIL',
  ])

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const drugList = await getSupportedDrugs()
        if (Array.isArray(drugList) && drugList.length > 0) {
          setSupportedDrugs(drugList)
        }
      } catch {
        // keep defaults
      }
    }
    fetchDrugs()
  }, [])

  const canAnalyze = useMemo(() => Boolean(vcfFile) && drugs.length > 0, [vcfFile, drugs])

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

    try {
      const allResults = []
      for (const drug of drugs) {
        const result = await analyzePharmacogenomics(vcfFile, drug)
        allResults.push(result)
      }

      const payload = {
        multiple: allResults.length > 1,
        current: 0,
        results: allResults,
      }

      saveResults(payload)
      navigate('/results', { state: payload })
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
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            PharmaGuard
            <br />
            Pharmacogenomic <span>Risk Prediction</span>
          </h1>
          <p className="hero-subtitle">
            Upload a VCF file, enter drug name(s), and get personalized risk predictions with
            explainable clinical recommendations aligned to CPIC.
          </p>
        </div>
      </section>

      <section className="analysis-section">
        <div className="input-form">
          <div className="form-group">
            <VCFUpload onFileSelect={setVcfFile} disabled={isLoading} />
          </div>

          <div className="form-group">
            <DrugInput
              onDrugSelect={setDrugs}
              disabled={isLoading}
              supportedDrugs={supportedDrugs}
            />
          </div>

          <button
            className="btn btn-primary btn-analyze"
            onClick={handleAnalyze}
            disabled={isLoading || !canAnalyze}
            type="button"
          >
            {isLoading ? 'Processing...' : 'Analyze Risk'}
          </button>
        </div>

        {isLoading && (
          <Loader
            message="Analyzing genetic data and predicting drug risks..."
            fullScreen
          />
        )}

        {error && (
          <ErrorAlert
            title={error.title}
            message={error.message}
            type={error.type}
            onClose={() => setError(null)}
          />
        )}
      </section>

      <section className="info-section">
        <div className="info-grid">
          <div className="info-card">
            <h3>🧬 Genetic Variants</h3>
            <p>Detect pharmacogenomic variants from real VCF (v4.2) patient data.</p>
          </div>
          <div className="info-card">
            <h3>🎯 Drug-Specific Risk</h3>
            <p>See Safe / Adjust Dosage / Toxic / Ineffective / Unknown with confidence.</p>
          </div>
          <div className="info-card">
            <h3>🧠 Explainable AI</h3>
            <p>Get concise explanations with variant citations and biological mechanisms.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage

