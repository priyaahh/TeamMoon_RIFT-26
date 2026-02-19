import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { FaBrain, FaLightbulb, FaMicrochip, FaBook } from 'react-icons/fa'
import './FeaturePage.css'

const AiInsightsPage = () => {
  return (
    <>
      <Navbar />

      <div className="feature-page">

        <div className="feature-page-header">
          <h1>AI-Powered Insights</h1>
          <p>
            LLM-generated clinical interpretations and evidence-based recommendations
          </p>
        </div>

        <div className="feature-page-content">
          <div className="feature-section">

            <h2>Intelligent Analysis Engine</h2>

            <div className="info-section">
              <h3><FaBrain /> LLM-Generated Explanations</h3>
              <ul>
                <li><strong>Plain Language:</strong> Complex genomic data translated into clear clinical English</li>
                <li><strong>Context-Aware:</strong> Tailored explanations based on individual variant profiles</li>
                <li><strong>Evidence-Based:</strong> Grounded in established pharmacogenomic guidelines</li>
                <li><strong>Actionable:</strong> Clear recommendations for prescribers</li>
                <li><strong>Personalized:</strong> Specific interpretation for each drug-variant combination</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaLightbulb /> Clinical Insights</h3>
              <ul>
                <li><strong>Phenotype Prediction:</strong> Metabolizer classification (poor, intermediate, normal, ultra-rapid)</li>
                <li><strong>Drug Metabolism Impact:</strong> Variant influence on drug processing</li>
                <li><strong>Risk Assessment:</strong> Probability and severity of adverse reactions</li>
                <li><strong>Alternative Options:</strong> Safer medication suggestions when applicable</li>
                <li><strong>Dosing Guidance:</strong> Adjusted dosing recommendations</li>
              </ul>
            </div>

            <div className="info-section">
              <h3><FaMicrochip /> AI Processing Workflow</h3>
              <ol>
                <li>Extract variant data from VCF input</li>
                <li>Match variants with pharmacogenomic associations</li>
                <li>Predict gene phenotype</li>
                <li>Reference clinical guideline databases</li>
                <li>Analyze drug-gene interactions</li>
                <li>Generate structured LLM explanations</li>
                <li>Validate against evidence sources</li>
                <li>Format output for clinical usability</li>
              </ol>
            </div>

            <div className="info-section">
              <h3><FaBook /> Knowledge Sources</h3>
              <ul>
                <li><strong>CPIC Guidelines:</strong> Clinical pharmacogenetics implementation standards</li>
                <li><strong>PharmGKB:</strong> Variant-drug association database</li>
                <li><strong>DrugBank:</strong> Drug mechanism and metabolism reference</li>
                <li><strong>PubMed:</strong> Peer-reviewed pharmacogenomic research</li>
                <li><strong>FDA Guidance:</strong> Regulatory recommendations for genetic testing</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Generated Outputs</h3>
              <ul>
                <li><strong>Patient Summary:</strong> Overview of major findings</li>
                <li><strong>Drug-Specific Reports:</strong> Individual medication analysis</li>
                <li><strong>Variant Interpretation:</strong> Clinical meaning of detected variants</li>
                <li><strong>Risk Stratification:</strong> Severity categorization</li>
                <li><strong>Professional Report:</strong> EHR-ready clinical documentation</li>
                <li><strong>Patient Version:</strong> Simplified explanation for non-clinical users</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Responsible AI Framework</h3>
              <ul>
                <li>Confidence levels included with all recommendations</li>
                <li>Uncertain predictions clearly flagged</li>
                <li>Clinical validation recommended for critical decisions</li>
                <li>Transparent reasoning and evidence references</li>
                <li>Continuous updates aligned with latest guidelines</li>
                <li>Bias monitoring and mitigation protocols</li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  )
}

export default AiInsightsPage
