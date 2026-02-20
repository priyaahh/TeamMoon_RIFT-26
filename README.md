# PharmaGuard: Pharmacogenomic Risk Prediction System
**RIFT 2026 Hackathon – HealthTech / Precision Medicine Track**

## 🔴 Problem Overview
Adverse drug reactions (ADRs) cause over **100,000 deaths annually in the U.S.**, many of which are preventable through pharmacogenomic testing. Genetic variations influence how patients metabolize medications; without proper analysis, clinicians may inadvertently prescribe drugs causing toxicity, treatment failure, or severe adverse reactions.

**PharmaGuard** addresses this critical problem by providing an AI-powered web application that:

- Analyzes patient genetic data (VCF files)  
- Infers pharmacogenomic phenotype  
- Predicts personalized drug risks  
- Provides clinically actionable recommendations  
- Generates structured LLM-based explanations for physicians  


## 🚀 Live Demo
- **Live Application:** [https://teammoon-rift26.vercel.app]
- **LinkedIn Demo Video:** [https://l1nk.dev/rift26teammoon]



## 🏗 Architecture Overview
PharmaGuard uses a **modular, API-first architecture** separating deterministic pharmacogenomic computation from LLM-based explainability. This ensures **reliable risk scoring** while providing physician-friendly interpretations.

### 🔄 System Flow
1. VCF File Upload
2. VCF Parsing (vcfpy)
3. Variant Analysis (Gene → Star Alleles → Phenotype)
4. Drug Rule Engine
5. Risk Scoring Engine
6. Structured JSON Output
7. LLM Explanation Generation (OpenAI API)
8. Final Clinical Report

### 🧠 AI / LLM Strategy
- Uses OpenAI `gpt-4o-mini` for **clinical explanation generation**  
- **LLM does NOT determine risk** — all risk scoring is rule-based  
- Outputs structured JSON for **interoperability**  
- Provides physician-friendly, actionable insights  

## 🧪 Core Features
- Automated VCF parsing and variant extraction  
- Diplotype & phenotype inference (e.g., CYP2D6)  
- Drug-specific rule engine for risk scoring  
- AI-generated clinical explanation  
- Structured, downloadable JSON outputs  
- REST API backend (**FastAPI**)  
- Secure API key management  

## 🧰 Tech Stack

**Backend / API**  
- Python 3.x  
- FastAPI, Uvicorn  
- vcfpy  

**AI / Explainability**  
- OpenAI GPT-4o-mini  
- python-dotenv  

**Architecture**  
- Modular rule engine  
- Deterministic risk scoring  
- LLM-based explainability  

## 📂 Project Structure

- **frontend/**
  - public/
  - src/
    - components/
      - layout/
        - Footer.jsx
        - Footer.css
      - results/
        - ... (other result components)
      - upload/
        - ... (VCF upload components)
      - ... (other UI components)
    - pages/
      - HomePage.jsx
      - VcfUploadPage.jsx
      - DrugInputPage.jsx
      - ResultsDisplayPage.jsx
      - ExportSharePage.jsx
      - ... (other pages)
    - utils/
      - validateVCF.js
    - styles/
      - ... (CSS files)
    - App.jsx
    - AppRouter.jsx
    - AppShell.jsx
    - main.jsx
    - App.css
    - ScrollToTop.jsx
  - package.json
  - vite.config.js
  - README.md
- **backend/**
  - app/
    - main.py
    - analyze.py
    - rules.py
    - risk.py
    - utils.py
    - test_full_pipeline.py
    - LLM/
      - llm_engine.py
  - requirements.txt
- **sample_vcfs/**
  - PGx_Test_600_Variants.vcf
  - test1.vcf
- README.md
- .env
- .gitignore
- requirements.txt
---

## ⚙ Installation Instructions

###  Clone Repository
git clone <your-repo-link>
cd <repo-folder>

###  Install Dependencies
py -m pip install fastapi uvicorn openai python-dotenv vcfpy

###  Add OpenAI API Key
Create a .env file in backend/:
OPENAI_API_KEY=your_openai_api_key_here

###  Run Backend
From project root:
uvicorn backend.app.main:app --reload
Windows:
py -m uvicorn backend.app.main:app --reload

### 📚 API Documentation

Once server is running, visit:
http://127.0.0.1:8000/docs

Endpoint: POST /process-vcf

Upload a .vcf file

Returns structured pharmacogenomic risk JSON

### 🛡 Security

API keys stored in .env (gitignored)

No hardcoded credentials

Modular separation of AI and deterministic logic

### 🌍 Deployment

Frontend deployed on Vercel

Backend compatible with: Vercel, Netlify, Render, AWS, Google Cloud, Azure

Set environment variables in your hosting dashboard

### 👥 Team Members

Blessy R & Mamathi Karthiyaini – AI Integration & Genomics Logic

Mounika D G – Backend Development

Priya V M – Frontend / UI

### 🏆 Innovation Highlights

Hybrid deterministic + AI architecture

Real-time pharmacogenomic risk prediction

Structured LLM-generated clinical explanations

Scalable and secure REST API design

### 🔮 Future Enhancements

Multi-gene pharmacogenomic support

Expanded drug database & CPIC alignment

Fine-tuned clinical LLM

Patient-friendly reports & batch processing


PharmaGuard demonstrates how AI can enhance precision medicine by combining pharmacogenomic rules with natural language clinical reasoning.

RIFT 2026 Hackathon – Pharmacogenomics / Explainable AI Track





