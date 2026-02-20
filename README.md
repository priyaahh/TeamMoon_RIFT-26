RIFT 2026 HACKATHON
PharmaGuard: Pharmacogenomic Risk Prediction System
🔴 Problem Overview

Adverse drug reactions (ADRs) kill over **100,000 Americans annually**, many of which are preventable through pharmacogenomic testing.
Genetic variations significantly influence how patients metabolize medications. Without analyzing these variants, clinicians may unknowingly prescribe drugs that lead to toxicity, treatment failure, or severe adverse reactions.
PharmaGuard addresses this critical problem by building an AI-powered web application that:

* Analyzes patient genetic data (VCF files)
* Determines pharmacogenomic phenotype
* Predicts personalized drug risk
* Provides clinically actionable recommendations
* Generates structured LLM-based explanations for physicians

🚀 Live Demo
🔗 **Live Application:** *[Add your deployed backend/frontend URL here]*
🎥 **LinkedIn Demo Video:** *[Add LinkedIn video link here]*


🏗 Architecture Overview

PharmaGuard follows a modular, API-first architecture that separates deterministic pharmacogenomic computation from AI-driven clinical interpretation. This ensures reliability in risk prediction while leveraging LLMs for explainability.
PharmaGuard uses a hybrid architecture combining deterministic genomic analysis with LLM-based explanation generation.

🔄 System Flow

```id="archflow"
VCF File Upload
        ↓
VCF Parsing (vcfpy)
        ↓
Variant Analysis
(Gene → Star Alleles → Phenotype)
        ↓
Drug Rule Engine
        ↓
Risk Scoring Engine
        ↓
Structured JSON Output
        ↓
LLM Explanation Generation (OpenAI API)
        ↓
Final Clinical Report
```


🧠 AI / LLM Strategy

The system uses OpenAI’s `gpt-4o-mini` model for:

* Clinical summary generation
* Physician-friendly detailed explanation
* Structured JSON-based output formatting

Important:

* The LLM does NOT determine risk.
* Risk scoring is rule-based using pharmacogenomic logic.
* The LLM generates explainable interpretation of computed results.
* Output is strictly formatted in JSON for interoperability.


🧪 Core Features

* Automated VCF parsing
* Diplotype & phenotype inference (CYP2D6 example)
* Drug response rule engine
* Risk scoring with severity & confidence
* AI-generated clinical explanation
* Strict structured JSON output
* REST API backend using FastAPI
* Secure API key management

🧰 Tech Stack

**Backend**
* Python 3.x
* FastAPI
* Uvicorn
* vcfpy

**AI**

* OpenAI API (gpt-4o-mini)
* python-dotenv

**Architecture**

* Modular rule engine
* Deterministic risk scoring
* LLM-based explainability layer



📂 Project Structure

```id="structure"
backend/
│
├── app/
│   ├── main.py                # FastAPI entry point
│   ├── analyze.py             # Genotype → Phenotype logic
│   ├── rules.py               # Drug rule engine
│   ├── risk.py                # Risk scoring
│   ├── utils.py               # VCF parsing
│   ├── test_full_pipeline.py  # JSON output builder
│   └── LLM/
│       └── llm_engine.py      # OpenAI integration
│
└── .env                       # API key storage (not committed)
```



⚙ Installation Instructions

1️⃣ Clone Repository

```bash id="clone"
git clone <your-repo-link>
cd <repo-folder>
```



2️⃣ Install Dependencies

```bash id="install"
pip install fastapi uvicorn openai python-dotenv vcfpy
```

Windows users:

```bash id="installwin"
py -m pip install fastapi uvicorn openai python-dotenv vcfpy
```

3️⃣ Add OpenAI API Key

Create a `.env` file inside the `backend/` folder:

```id="env"
OPENAI_API_KEY=your_openai_api_key_here
```

⚠ Do NOT push `.env` to GitHub.

4️⃣ Run Backend

From project root:

```bash id="runroot"
uvicorn backend.app.main:app --reload
```

Or from backend folder:

```bash id="runbackend"
uvicorn app.main:app --reload
```

Windows recommended:

```bash id="runpy"
py -m uvicorn backend.app.main:app --reload
```

📚 API Documentation

Once server is running, open:

```
http://127.0.0.1:8000/docs
```

Endpoint

`POST /process-vcf`

Upload:

* VCF file

Returns:

* Structured pharmacogenomic risk assessment JSON

📤 Usage Example

Request

Upload a `.vcf` file via Swagger UI or API client.

Response Example

```json id="responseexample"
{
  "patient_id": "PATIENT_001",
  "drug": "codeine",
  "risk_assessment": {
    "risk_label": "HIGH RISK",
    "confidence_score": 0.9,
    "severity": "high"
  },
  "pharmacogenomic_profile": {
    "primary_gene": "CYP2D6",
    "diplotype": "*6/*6",
    "phenotype": "PM",
    "detected_variants": [...]
  },
  "clinical_recommendation": {
    "drug": "codeine",
    "recommendation": "Avoid use — poor metabolizer",
    "risk_level": "high"
  },
  "llm_generated_explanation": {
    "summary": "Patient is at high pharmacogenomic risk.",
    "details": "Due to CYP2D6 poor metabolizer phenotype..."
  },
  "quality_metrics": {
    "vcf_parsing_success": true,
    "variants_detected": 3
  }
}
```


🛡 Security

* API keys stored securely in `.env`
* `.env` excluded via `.gitignore`
* No hardcoded credentials
* Clean modular separation of logic and AI



🌍 Deployment

This backend can be deployed to:

* Render
* Railway
* AWS EC2
* Azure
* Google Cloud Platform

Set environment variables in hosting dashboard.

👥 Team Members

* **Blessy R and Mamathi Karthiyaini** – AI Integration & Genomics Logic
* **Mounika D G** – Backend Development
* **Priya V M** – Frontend / UI



🏆 Innovation Highlights

* Hybrid deterministic + AI architecture
* Real-time pharmacogenomic risk interpretation
* Structured clinical explanation generation
* Explainable AI in precision medicine
* Scalable REST API design


🔮 Future Enhancements

* Multi-gene pharmacogenomic support
* Expanded drug database
* Fine-tuned clinical LLM
* Patient-friendly reports
* Batch processing of genomic datasets

PharmaGuard demonstrates how AI can enhance precision medicine by combining pharmacogenomic rules with natural language clinical reasoning.



